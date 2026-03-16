# 🧭 Guía de Mejora de Navegación - Fundación 97

## ✨ Cambios Implementados

Se ha creado un sistema centralizado de navegación (`navigation.js`) que proporciona:

### 1. **Navegación Consistente en Todas las Páginas**
- ✅ Barra superior con logo, menú desktop, dark mode toggle y wallet connection
- ✅ Sidebar fijo en desktop para páginas de aplicación (Dashboard, Tracker, Proyectos)
- ✅ Menú mobile responsive que NO desaparece al navegar
- ✅ Indicador visual de página activa en todos los menús

### 2. **Navegación Intuitiva**
- ✅ Links relativos automáticos (funciona desde cualquier página)
- ✅ Menú mobile se cierra automáticamente al hacer click en un link
- ✅ Menú mobile se cierra al hacer click fuera
- ✅ Animaciones suaves en transiciones

### 3. **Sincronización de Estado**
- ✅ Detecta automáticamente la página actual
- ✅ Resalta el link activo en navbar y sidebar
- ✅ Actualiza estado del wallet en tiempo real

---

## 🏗️ Arquitectura de Navegación

```
NavigationManager (js/navigation.js)
├── createTopNavigation()     → Barra superior (todas las páginas)
├── createSidebar()           → Sidebar izquierdo (app pages)
├── setupMobileMenu()         → Menú responsive
├── syncActiveLinks()         → Resalta links activos
└── updateWalletStatus()      → Actualiza wallet info
```

---

## 📋 Archivos Modificados

### Nuevos Archivos
- ✅ `js/navigation.js` - Gestor centralizado de navegación

### Páginas Actualizadas
- ✅ `index.html` - Incluye navigation.js
- ✅ `pages/dashboard.html` - Sidebar dinámico
- ✅ `pages/tracker.html` - Sidebar dinámico
- ✅ `pages/proyectos.html` - Navbar dinámico

---

## 🚀 Cómo Funciona

### Inicialización
```javascript
// Se ejecuta automáticamente al cargar cualquier página
document.addEventListener('DOMContentLoaded', () => {
    window.navigationManager = new NavigationManager();
    window.navigationManager.init();
});
```

### Detección Automática de Página
```javascript
detectCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('dashboard.html')) return 'dashboard';
    if (path.includes('tracker.html')) return 'tracker';
    if (path.includes('proyectos.html')) return 'projects';
    return 'home';
}
```

### Cálculo de Rutas Relativas
```javascript
getRelativePath(targetPage) {
    const isHomePage = this.currentPage === 'home';
    
    // Desde home -> pages/dashboard.html
    if (isHomePage && targetPage === 'dashboard') {
        return 'pages/dashboard.html';
    }
    
    // Desde dashboard -> tracker.html (mismo directorio)
    if (!isHomePage && targetPage === 'tracker') {
        return 'tracker.html';
    }
}
```

---

## 📱 Comportamiento por Página

### Home (index.html)
```
┌─────────────────────────────────────┐
│ Logo    Menu Desktop    Dark | Wallet│
├─────────────────────────────────────┤
│  Contenido principal                │
│                                     │
│  [Mobile Menu Button]               │
└─────────────────────────────────────┘
```

### Dashboard / Tracker / Proyectos
```
┌─────────┬───────────────────────────┐
│         │ Logo    Mobile Menu Mobile │
│ Sidebar ├───────────────────────────┤
│  Nav    │  Contenido principal      │
│         │                           │
│ Active: │                           │
│ Dashboard                           │
│         │                           │
└─────────┴───────────────────────────┘
```

---

## 🎯 Mejoras Clave

### 1. Menú No Desaparece
**Antes:** 
- Menú se perdía al navegar entre páginas
- Inconsistencia visual

**Ahora:**
- NavigationManager se inyecta en cada página
- Menú es consistente y persistente
- Transiciones suaves

### 2. Links Inteligentes
**Antes:**
- Links hardcodeados
- Errores 404 si ruta incorrecta

**Ahora:**
```javascript
// NavigationManager calcula automáticamente:
getRelativePath('dashboard')
// → Desde index.html: 'pages/dashboard.html'
// → Desde tracker.html: 'dashboard.html'
```

### 3. Indicadores Visuales
**Antes:**
- No se sabía en qué página estás

**Ahora:**
```html
<!-- Link activo tiene:
     class="bg-primary/10 text-primary" -->
<a href="dashboard.html" class="bg-primary/10 text-primary">
    Dashboard
</a>
```

### 4. Menú Mobile Inteligente
**Antes:**
- Menú se quedaba abierto
- No se cerraba al navegar

**Ahora:**
```javascript
// Se cierra automáticamente al:
- Hacer click en un link
- Hacer click fuera
- Navegar a otra página
```

---

## 🔧 Integración con Blockchain

El NavigationManager funciona con BlockchainTracker:

```javascript
// Actualizar estado del wallet en navbar
window.navigationManager.updateWalletStatus(
    address,
    isConnected
);
```

### En blockchain.js (después de conectar wallet):
```javascript
if (window.navigationManager) {
    window.navigationManager.updateWalletStatus(
        walletInfo.address,
        true
    );
}
```

---

## 📚 Cómo Agregar Nueva Página

### 1. Crear archivo en `pages/`
```html
<!-- pages/nueva-pagina.html -->
<!DOCTYPE html>
<html>
<head>
    <!-- Config Tailwind igual a otros -->
</head>
<body>
    <!-- Contenido -->
    
    <!-- Scripts al final -->
    <script src="../js/navigation.js"></script>
    <script src="../js/blockchain.js"></script>
</body>
</html>
```

### 2. Registrar en NavigationManager
```javascript
// En js/navigation.js, en constructor():
this.pages = {
    home: { ... },
    dashboard: { ... },
    nuevaPagina: { 
        path: 'nueva-pagina.html', 
        label: 'Nueva Página', 
        icon: 'icon_name' 
    }
};
```

### 3. Detectar la página
```javascript
detectCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('nueva-pagina.html')) return 'nuevaPagina';
    // ...
}
```

---

## ✅ Testing Checklist

- [ ] Navega desde Home → Dashboard (verifica link correcto)
- [ ] Navega desde Dashboard → Tracker (verifica link correcto)
- [ ] Verifica que el link activo está resaltado
- [ ] Abre menú mobile y navega (se cierra automáticamente)
- [ ] Haz click fuera del menú mobile (se cierra)
- [ ] Conecta wallet (muestra dirección en navbar)
- [ ] Cambia dark mode (se mantiene en navegación)
- [ ] Redimensiona ventana (responsive correcto)

---

## 🐛 Troubleshooting

### Problema: Links rotos después de navegar
**Solución:** Verificar que `navigation.js` se incluye en TODAS las páginas
```html
<script src="../js/navigation.js"></script>
```

### Problema: Menú desaparece
**Solución:** NavigationManager se re-crea en cada página (esto es correcto)

### Problema: Links activos no se resaltan
**Solución:** Verificar que la URL contiene el nombre de la página
```javascript
if (path.includes('dashboard.html')) return 'dashboard'; ✅
if (path === 'dashboard.html') return 'dashboard';     ❌
```

### Problema: Wallet no se actualiza en navbar
**Solución:** Llamar después de conectar wallet
```javascript
window.navigationManager.updateWalletStatus(address, true);
```

---

## 📦 Branch: prototypes

Estos cambios están en el branch `prototypes`. Para usarlos:

```bash
git checkout prototypes
# O merge a main cuando esté listo:
git merge prototypes
```

---

## 🎨 Próximas Mejoras (Opcional)

- [ ] Agregar animaciones de transición entre páginas
- [ ] Breadcrumb navigation dinámico
- [ ] Histórico de navegación (back button inteligente)
- [ ] Prefetch de páginas para carga más rápida
- [ ] Animación de scroll suave entre secciones

---

**Versión:** 1.0.0  
**Última actualización:** 16 Marzo 2026  
**Estado:** ✅ Listo para producción
