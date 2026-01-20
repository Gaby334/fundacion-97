# 🎨 Fundación 97 - Brandbook de Colores

**Actualizado**: 20 Enero 2026  
**Versión**: 2.0 (Nueva Paleta Aplicada)

---

## 📋 Paleta de Colores Oficial

### Colores Principales

| Nombre | Hex | RGB | Uso | Ejemplo |
|--------|-----|-----|-----|---------|
| **Deep Blue** | #0D3B66 | rgb(13, 59, 102) | Textos principales, títulos, líneas | `text-deep-blue`, `border-deep-blue` |
| **Trust Blue** | #2E86AB | rgb(46, 134, 171) | Botones primarios, links, highlights | `bg-primary`, `text-primary` |
| **Light Blue** | #A3CEF1 | rgb(163, 206, 241) | Fondos secundarios, hover suaves | `bg-light-blue`, hover states |
| **Warm Orange** | #F28F3B | rgb(242, 143, 59) | Acentos clave (97%), botones CTA, progreso | `bg-accent`, `text-accent`, `accent` |
| **Soft Orange** | #F8B27A | rgb(248, 178, 122) | Badges, estados positivos | `bg-secondary`, `text-secondary` |

### Colores Secundarios

| Nombre | Hex | RGB | Uso |
|--------|-----|-----|-----|
| **Warm Beige** | #FAF0CA | rgb(250, 240, 202) | Fondo principal (calidez sutil) | `bg-background-light` |
| **Off-White** | #FFF8F0 | rgb(255, 248, 240) | Cards, fondo alternativo | `bg-surface-light` |
| **Dark Gray** | #1C2A38 | rgb(28, 42, 56) | Texto secundario | `text-dark-gray`, `bg-background-dark` |

---

## 🎯 Guía de Aplicación

### Jerarquía de Información

```
Títulos Principales       → Deep Blue (#0D3B66)
Títulos Secundarios       → Trust Blue (#2E86AB)
Texto Body               → Dark Gray (#1C2A38)
Acentos Clave (97%)      → Warm Orange (#F28F3B)
Estado Positivo (Verified)→ Soft Orange (#F8B27A)
Fondos Principales       → Warm Beige (#FAF0CA)
Fondos Cards/Surfaces    → Off-White (#FFF8F0)
```

### Componentes Principales

#### Botones Primarios
```tailwind
bg-primary (Trust Blue #2E86AB)
hover:bg-primary-dark (Deep Blue #0D3B66)
text-white
```

#### Botones Secundarios
```tailwind
bg-accent (Warm Orange #F28F3B)
hover:bg-opacity-90
text-white
```

#### Badges / Estados
```tailwind
bg-secondary (Soft Orange #F8B27A)
text-white
```

#### Enlaces / Highlights
```tailwind
text-primary (Trust Blue #2E86AB)
hover:text-primary-dark (Deep Blue #0D3B66)
```

#### Fondos
```tailwind
bg-background-light (Warm Beige #FAF0CA)
dark:bg-background-dark (Dark Gray #1C2A38)
```

#### Surfaces (Cards, Paneles)
```tailwind
bg-surface-light (Off-White #FFF8F0)
border border-light-blue (#A3CEF1)
```

---

## 🔄 Cambios Realizados

### Paleta Anterior
- Primary: #1b7898 (Teal oscuro)
- Primary Dark: #135d76 (Teal más oscuro)
- Secondary: #9FD49C (Verde)
- Accent: #E3B24F (Oro)

### Paleta Nueva
- Primary: #2E86AB (Trust Blue - más amigable)
- Primary Dark: #0D3B66 (Deep Blue - contraste total)
- Secondary: #F8B27A (Soft Orange - calidez)
- Accent: #F28F3B (Warm Orange - energía)

### Beneficios
✅ Mayor contraste y accesibilidad  
✅ Paleta más cálida y acogedora  
✅ Mejor diferenciación entre elementos  
✅ Consistencia con servicios financieros seguros  

---

## 📂 Archivos Actualizados

| Archivo | Cambios |
|---------|---------|
| `index.html` | Tailwind config + gradientes conic |
| `pages/dashboard.html` | Tailwind config |
| `pages/tracker.html` | Tailwind config + gradientes conic |
| `pages/proyectos.html` | Tailwind config |
| `js/donations.js` | Gradientes en modal donaciones |

---

## 🎨 Gradientes Utilizados

### Donut Chart (97% Model)
```css
background: conic-gradient(#2E86AB 0% 97%, #F28F3B 97% 100%);
box-shadow: 0 0 50px -10px rgba(46, 134, 171, 0.5);
```

### Barras de Progreso
```css
background: linear-gradient(90deg, #F28F3B, #2E86AB);
```

---

## 📱 Responsive & Dark Mode

Todos los colores están configurados en Tailwind para funcionar con:
- **Light Mode**: Colores principales aplicados
- **Dark Mode**: Variantes oscuras automáticas

```tailwind
class="bg-surface-light dark:bg-surface-dark"
class="text-deep-blue dark:text-light-blue"
```

---

## ✅ Checklist de Validación

- [x] Colores principales en todas las páginas HTML
- [x] Gradientes actualizados
- [x] CSS Tailwind config extendido con todos los colores
- [x] Bordes y divisores actualizados
- [x] Dark mode compatible
- [x] Badges y estados positivos con paleta nueva
- [ ] Testing visual completo en navegadores
- [ ] Testing en dispositivos móviles

---

## 📞 Notas de Desarrollo

**Para desarrolladores**: Usa las clases Tailwind en lugar de hex directo:
- ✅ `bg-primary` en lugar de `bg-[#2E86AB]`
- ✅ `text-accent` en lugar de `text-[#F28F3B]`
- ✅ Usa `hover:bg-primary-dark` para interactividad

**Para mantener consistencia**:
1. Siempre usa las variables CSS custom de Tailwind
2. No hardcodes colores hex excepto en `style=` inline
3. Revisa `tailwind.config` en cada HTML para asegurar colores disponibles

---

## 🚀 Próximos Pasos

1. Testing visual en todos los navegadores
2. Revisión de contraste WCAG (AA mínimo)
3. Feedback de diseño
4. Posibles ajustes de saturación si es necesario
