# 📐 GUÍA DE CONSISTENCIA VISUAL Y NAVEGACIÓN
## Fundación 97 - Sistema de Diseño Profesional

**Documento**: Sistema de Diseño Integrado  
**Versión**: 1.0  
**Fecha**: Marzo 2026  
**Audiencia**: Stakeholders, UX/UI Designers, Developers  
**Objetivo**: Garantizar coherencia visual y experiencia unificada en todas las páginas

---

## 📋 ÍNDICE

1. [Arquitectura Visual](#arquitectura-visual)
2. [Paleta de Colores](#paleta-de-colores)
3. [Tipografía](#tipografía)
4. [Espaciado y Layout](#espaciado-y-layout)
5. [Sistema de Navegación](#sistema-de-navegación)
6. [Componentes Reutilizables](#componentes-reutilizables)
7. [Patrones de Interacción](#patrones-de-interacción)
8. [Flujos de Navegación](#flujos-de-navegación)
9. [Checklist de Implementación](#checklist-de-implementación)

---

## 🏗️ ARQUITECTURA VISUAL

### Principios de Diseño

```
FUNDACIÓN 97 - SISTEMA COHERENTE
│
├─ Solidez Visual
│  └─ Página branding + app pages = mismo universo
│
├─ Consistencia Comportamental
│  └─ Mismos patrones de interacción en todas partes
│
├─ Claridad Jerárquica
│  └─ Usuario siempre sabe dónde está y cómo ir
│
└─ Profesionalismo
   └─ Every pixel cuenta para una entrega de Master
```

### Modelo de Navegación

```
┌─────────────────────────────────────────────────────────┐
│                      LANDING (index.html)               │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Top Navigation (Horizontal)                      │  │
│  │ - Logo + "Fundación 97"                         │  │
│  │ - Links: Cómo Funciona | Proyectos | Dashboard │  │
│  │ - CTA: Connect Wallet                           │  │
│  └──────────────────────────────────────────────────┘  │
│  ├─ Hero Section                                       │
│  ├─ Stats Section                                      │
│  ├─ Featured Projects                                  │
│  ├─ How It Works                                       │
│  ├─ FAQ Section                                        │
│  └─ Footer                                             │
└─────────────────────────────────────────────────────────┘
                           ↓
        ┌──────────────────┼──────────────────┐
        ↓                  ↓                  ↓
    DASHBOARD          TRACKER            PROYECTOS
  (dashboard.html)   (tracker.html)   (proyectos.html)
  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
  │ Sidebar     │   │ Sidebar     │   │ Sidebar     │
  │ + TopBar    │   │ + TopBar    │   │ + TopBar    │
  │ + Main      │   │ + Main      │   │ + Main      │
  └─────────────┘   └─────────────┘   └─────────────┘
```

---

## 🎨 PALETA DE COLORES

### Colores Primarios (Mantener Consistentes)

```
PRIMARY (Trust Blue):
├─ #2E86AB - Color principal (botones, highlights)
├─ #0D3B66 - Dark variant (hover states)
└─ #A3CEF1 - Light variant (backgrounds)

SECONDARY (Warm Orange):
├─ #F8B27A - Color secundario (accents)
├─ #F28F3B - Dark variant (hover states)
└─ [derivado] - Light backgrounds
```

### Colores de Superficie (Aplicar Globalmente)

```
LIGHT MODE (Predeterminado):
├─ Background: #FAF0CA (warm beige)
├─ Surface Light: #FFF8F0 (off-white)
├─ Text: #1C2A38 (dark gray)
├─ Border: #E2E8F0 (light gray)
└─ Slate palette: 50-900

DARK MODE (Opcional):
├─ Background Dark: #1C2A38 (dark gray)
├─ Surface Dark: #2E3B4A (darker gray)
├─ Text: #F1F5F9 (white)
├─ Border: #475569 (slate)
└─ Slate palette inverted
```

### Usos por Contexto

| Elemento | Color | Uso |
|----------|-------|-----|
| Logo/Marca | Primary #2E86AB | Sidebar, Headers |
| CTAs Principales | Primary #2E86AB | Botones donate, connect |
| Hover States | Primary-dark #0D3B66 | Interactividad |
| Badges/Tags | Secondary #F8B27A | Categorías, status |
| Success | Green #22C55E | Confirmaciones |
| Error | Red #EF4444 | Alertas |
| Warning | Yellow #FBBF24 | Avisos |
| Info | Blue #3B82F6 | Información |

---

## 🔤 TIPOGRAFÍA

### Familias de Fuentes

```
DISPLAY (Headings H1-H3):
├─ Font: "Outfit" o "Manrope"
├─ Weights: 700 (bold), 800 (extra-bold)
├─ Use Case: Títulos de secciones, hero text
└─ Class: font-display

BODY (Párrafos, UI):
├─ Font: "Inter"
├─ Weights: 400 (regular), 500 (medium), 600 (semibold)
├─ Use Case: Contenido, labels, descripciones
└─ Class: font-body (o default)

ICONS:
├─ Font: Material Symbols Outlined
├─ Sizes: 20px, 24px, 32px
└─ Filled: Usar .icon-filled para estados activos
```

### Escala Tipográfica

```
H1: 36px (2.25rem) - font-bold - Landing hero
H2: 28px (1.875rem) - font-bold - Section titles
H3: 20px (1.25rem) - font-semibold - Card titles
H4: 16px (1rem) - font-semibold - Subsection titles
P: 14px (0.875rem) - font-regular - Body text
P-Small: 12px (0.75rem) - font-regular - Captions, hints
P-XSmall: 11px (0.6875rem) - font-regular - Metadata

Aplicar consistentemente en todas las páginas
```

---

## 📏 ESPACIADO Y LAYOUT

### Sistema de Espaciado (Tailwind)

```
Base Unit: 4px

Espacios Comunes:
├─ px-4 / py-4 = 16px (contenido)
├─ px-6 / py-6 = 24px (secciones)
├─ px-8 / py-8 = 32px (grands sections)
├─ gap-4 = 16px (entre elementos)
└─ gap-6 = 24px (entre grupos)

Patrones Recomendados:
├─ Padding interior de cards: px-5 py-4
├─ Espaciado entre items: gap-4
├─ Espaciado entre secciones: py-12 o py-16
└─ Margen de contenedor: p-6 lg:p-10
```

### Breakpoints Responsivos (Tailwind)

```
Mobile First:
├─ Default: < 640px (todos screens)
├─ sm: 640px - Smartphones landscape
├─ md: 768px - Tablets
├─ lg: 1024px - Small desktop
├─ xl: 1280px - Desktop
└─ 2xl: 1536px - Large desktop

Aplicar:
├─ Sidebar: hidden md:flex (no mostrar en móvil)
├─ Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
└─ Text: text-sm md:text-base lg:text-lg
```

### Layout Base (Todas las App Pages)

```html
<body class="flex h-screen overflow-hidden">
  <!-- SIDEBAR (Desktop only) -->
  <aside class="w-64 hidden md:flex flex-col bg-surface-light sticky top-0">
    <!-- Logo + Navigation -->
  </aside>

  <!-- MAIN AREA -->
  <main class="flex-1 flex flex-col h-screen overflow-hidden">
    <!-- TOP BAR -->
    <header class="h-16 bg-surface-light border-b flex items-center justify-between px-6">
      <!-- Breadcrumbs, Wallet, Network Status -->
    </header>

    <!-- SCROLLABLE CONTENT -->
    <div class="flex-1 overflow-y-auto custom-scroll">
      <div class="p-6 lg:p-10">
        <div class="max-w-7xl mx-auto">
          <!-- PAGE CONTENT -->
        </div>
      </div>
    </div>
  </main>
</body>
```

---

## 🧭 SISTEMA DE NAVEGACIÓN

### Niveles de Navegación

#### NIVEL 1: Top Navigation (index.html)

```
┌─────────────────────────────────────────────────────┐
│ [Logo] Fundación 97   |  Home  Cómo Funciona  Proyec│
│                                                    │
│                          [Connect Wallet] [Mode]  │
└─────────────────────────────────────────────────────┘

Características:
├─ Sticky (sigue al scroll)
├─ Logo clickeable a home
├─ 4-5 links horizontales
├─ CTA button alineado a la derecha
└─ Dark mode toggle (opcional)
```

#### NIVEL 2: Sidebar Navigation (Pages de App)

```
┌──────────────────┐
│ [Logo]           │
│ Fundación 97     │
│ Transparency 1st │
├──────────────────┤
│ > Overview       │  (dashboard.html) - ACTIVO si estás en dashboard
│ > My Donations   │  (tracker.html) - ACTIVO si estás en tracker
│ > Projects       │  (proyectos.html) - ACTIVO si estás en proyectos
│ > Wallet         │  (#) - Placeholder
│ > Settings       │  (#) - Placeholder
├──────────────────┤
│ [User Profile]   │
│ @ wallet.addr    │
│ [Disconnect]     │
└──────────────────┘

Características:
├─ Ancho fijo: 256px (w-64)
├─ Sticky (no scrollea)
├─ Enlaces mostrados en negrita si ACTIVOS
├─ Hover effect en todos los links
├─ Icono + Texto en cada item
└─ Usuario profile al final
```

#### NIVEL 3: Breadcrumbs (Top Bar de App Pages)

```
Estructura:
├─ Icono de página + Nombre
├─ Separador: "/"
├─ Path actual
└─ Status badge (si aplica)

Ejemplo (Tracker):
  🗺️ Projects / 💰 My Donations / 📊 Tracking
  
Ejemplo (Dashboard):
  📊 Dashboard

Ejemplos (Proyectos):
  🗺️ Projects / 🔍 Search Results
```

### Indicadores de Página Activa

```
VISUAL INDICATORS:
├─ Background color: bg-primary/10
├─ Text color: text-primary (bold)
├─ Icon: Filled (.icon-filled)
└─ Subtle shadow o underline

Ejemplo (Sidebar):
  ✓ Overview  (activo en dashboard.html)
    - bg-primary/10 text-primary font-semibold
    - icon-filled
    
  My Donations  (inactivo)
    - bg-transparent text-slate-600
    - hover:bg-slate-50
```

---

## 🎯 COMPONENTES REUTILIZABLES

### Componente: Card (Proyecto)

```html
<div class="project-card bg-surface-light border border-slate-100 
            rounded-lg overflow-hidden shadow-lg hover:shadow-2xl">
  <!-- Image -->
  <div class="relative h-48 overflow-hidden bg-slate-300">
    <img src="" class="w-full h-full object-cover" />
    <!-- Badge Verified -->
    <div class="absolute top-3 right-3 bg-white/95 px-3 py-1.5 
                rounded-lg shadow-md text-xs">
      ✓ Verified
    </div>
    <!-- Category Tag -->
    <span class="absolute bottom-3 left-3 px-3 py-1 rounded-lg 
                 text-white text-xs font-bold">
      Educación
    </span>
  </div>

  <!-- Content -->
  <div class="p-5 flex flex-col gap-4">
    <div>
      <h3 class="text-slate-900 font-bold mb-2">Project Title</h3>
      <p class="text-slate-500 text-sm line-clamp-2">Description</p>
    </div>

    <!-- Progress Bar -->
    <div>
      <div class="flex justify-between mb-2">
        <span class="text-sm">Raised: <strong>$X</strong></span>
        <span class="text-slate-400">Goal: $Y</span>
      </div>
      <div class="w-full bg-slate-200 rounded-full h-2.5">
        <div class="bg-primary h-full" style="width: 65%"></div>
      </div>
      <p class="text-right text-xs text-slate-500 mt-1">65% Funded</p>
    </div>

    <!-- Badge 97% -->
    <div class="bg-slate-50 border border-slate-200 rounded-lg p-3 flex gap-2">
      <div class="w-7 h-7 rounded-full bg-primary/20 flex items-center">
        ✓
      </div>
      <div>
        <p class="text-xs font-bold text-primary">97% Direct</p>
        <p class="text-xs text-slate-500">No intermediaries</p>
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex gap-2">
      <button class="flex-1 bg-primary hover:bg-primary-dark 
                     text-white py-2.5 rounded-lg font-semibold text-sm">
        Donate Now
      </button>
      <button class="w-11 border border-slate-200 rounded-lg 
                     flex items-center justify-center">
        ♡
      </button>
    </div>
  </div>
</div>
```

**Aplicación**: 
- ✓ Dashboard (Active Projects)
- ✓ Tracker (Related Projects)
- ✓ Proyectos (Main Grid)

### Componente: Stats Card

```html
<div class="bg-surface-light border border-slate-100 rounded-lg p-6">
  <div class="flex items-center gap-4">
    <div class="w-12 h-12 rounded-lg bg-primary/10 
                flex items-center justify-center">
      <span class="material-symbols-outlined text-primary text-2xl">
        trending_up
      </span>
    </div>
    <div>
      <p class="text-slate-600 text-sm font-medium">Total Contributed</p>
      <p class="text-slate-900 font-bold text-2xl">$14,250</p>
      <p class="text-xs text-slate-500">+12.5% this month</p>
    </div>
  </div>
</div>
```

**Aplicación**: Dashboard overview

### Componente: Button

```html
<!-- Primary Button -->
<button class="px-6 py-2.5 bg-primary hover:bg-primary-dark 
               text-white rounded-lg font-semibold text-sm 
               transition-colors">
  Donate
</button>

<!-- Secondary Button -->
<button class="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 
               text-slate-900 rounded-lg font-semibold text-sm 
               transition-colors">
  Cancel
</button>

<!-- Icon Button -->
<button class="w-11 h-11 rounded-lg border border-slate-200 
               flex items-center justify-center text-slate-600 
               hover:text-primary transition-colors">
  <span class="material-symbols-outlined">favorite_border</span>
</button>
```

### Componente: Badge

```html
<!-- Category Badge -->
<span class="px-3 py-1 rounded-lg text-white text-xs font-bold"
      style="background-color: #f97316;">
  Educación
</span>

<!-- Status Badge -->
<span class="px-3 py-1.5 rounded-full text-xs font-semibold 
            bg-green-100 text-green-700">
  ✓ Verified
</span>

<!-- Efficiency Badge -->
<span class="px-3 py-1.5 rounded-full text-xs font-bold 
            bg-primary/10 text-primary">
  97% Direct
</span>
```

---

## ⚡ PATRONES DE INTERACCIÓN

### Hover Effects

```css
/* Links */
a.text-primary:hover {
  opacity: 0.8;
  transition: all 0.2s ease;
}

/* Cards */
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.12);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Buttons */
button:hover {
  transform: scale(1.02);
  transition: all 0.2s ease;
}

/* Sidebar Links */
nav a:hover {
  background-color: rgba(51, 65, 85, 0.05);
}
```

### Transiciones

```
Duración estándar: 200-300ms
├─ Hover states: 200ms
├─ Modal open/close: 300ms
├─ Color changes: 200ms
└─ Animations: 600ms (fade-in)

Timing function:
├─ Ease-out: Acciones del usuario
├─ Cubic-bezier(0.4, 0, 0.2, 1): Movements
└─ Linear: Continuous animations
```

### Estados de Botones

```
DEFAULT:
├─ Background: Primary blue
├─ Text: White
├─ Shadow: sm

HOVER:
├─ Background: Dark blue
├─ Transform: scale(1.02)
└─ Cursor: pointer

ACTIVE/PRESSED:
├─ Background: Darker blue
├─ Transform: scale(0.98)
└─ Shadow: inset

DISABLED:
├─ Background: Gray
├─ Opacity: 0.5
└─ Cursor: not-allowed
```

---

## 🗺️ FLUJOS DE NAVEGACIÓN

### Flujo Principal (Nuevo Visitante)

```
Landing (index.html)
    ├─ Lee contenido
    ├─ Ve proyectos destacados
    └─ [Connect Wallet] → Dashboard
        ↓
        Dashboard (dashboard.html)
        ├─ Revisa stats
        ├─ Ve proyectos activos
        ├─ Link a Proyectos
        └─ Link a Donations (Tracker)
```

### Flujo de Donación

```
Landing / Dashboard / Proyectos
    ├─ Ve proyecto
    └─ [Donate Now] → Modal
        ├─ Selecciona monto
        ├─ Revisa breakdown (97/3)
        └─ [Confirm] → MetaMask
            ├─ Aprueba en wallet
            └─ → Tracker
                ├─ Ve transacción
                └─ Link a Dashboard
```

### Flujo de Navegación (App Pages)

```
dashboard.html
    ├─ Sidebar: Overview → ✓ ACTIVO
    ├─ Sidebar: My Donations → tracker.html
    ├─ Sidebar: Projects → proyectos.html
    └─ [View All] button → proyectos.html

tracker.html
    ├─ Sidebar: Dashboard → dashboard.html
    ├─ Sidebar: My Donations → ✓ ACTIVO
    ├─ Sidebar: Projects → proyectos.html
    └─ [Explore Projects] → proyectos.html

proyectos.html
    ├─ Sidebar: Dashboard → dashboard.html
    ├─ Sidebar: My Donations → tracker.html
    ├─ Sidebar: Projects → ✓ ACTIVO
    └─ [Donate] button → Modal
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Colores (Verificar Consistencia)

- [ ] Primary blue (#2E86AB) usado en:
  - [ ] Logo + Branding
  - [ ] Botones principales
  - [ ] Links activos
  - [ ] Accents

- [ ] Secondary orange (#F8B27A) usado en:
  - [ ] Badges/Tags
  - [ ] Secondary CTAs
  - [ ] Accents

- [ ] Surfaces consistentes:
  - [ ] Background light: #FAF0CA
  - [ ] Surface light: #FFF8F0
  - [ ] Text: #1C2A38

### Tipografía (Verificar Escalas)

- [ ] H1: 36px (landing hero)
- [ ] H2: 28px (section titles)
- [ ] H3: 20px (card titles)
- [ ] Body: 14px (content)
- [ ] Small: 12px (captions)

- [ ] Font families:
  - [ ] Display: Outfit/Manrope
  - [ ] Body: Inter
  - [ ] Icons: Material Symbols

### Espaciado (Verificar Grid)

- [ ] Contenedor max-width: 7xl (80rem)
- [ ] Padding base: px-6 (24px)
- [ ] Gap entre items: gap-4 (16px)
- [ ] Gap entre secciones: gap-8 (32px)

- [ ] Responsive:
  - [ ] Hidden en mobile: sidebar
  - [ ] Grid ajusta: 1 → 2 → 3 cols
  - [ ] Padding ajusta: p-4 → p-6 → p-10

### Navegación (Verificar Estructura)

#### Landing (index.html)

- [ ] Top nav sticky
- [ ] Logo clickeable
- [ ] 4-5 links horizontales
- [ ] CTA button visible
- [ ] Mobile menu funciona

#### Dashboard (dashboard.html)

- [ ] Sidebar visible (desktop)
- [ ] Logo + branding en sidebar
- [ ] Nav items: Overview (activo), Donations, Projects, Wallet
- [ ] Top bar con breadcrumbs
- [ ] Wallet connection indicator
- [ ] Network status display
- [ ] User profile section

#### Tracker (tracker.html)

- [ ] Sidebar visible (desktop)
- [ ] Nav items: Dashboard, Donations (activo), Projects, Wallet
- [ ] Breadcrumbs mostrados
- [ ] Timeline con donaciones
- [ ] Links a Dashboard / Proyectos

#### Proyectos (proyectos.html)

- [ ] Sidebar visible (desktop)
- [ ] Nav items: Dashboard, Donations, Projects (activo), Wallet
- [ ] Search + filtros funcionales
- [ ] Grid responsive: 1 → 2 → 3
- [ ] Cards con mismo diseño
- [ ] Donate button funciona

### Componentes (Verificar Visualización)

- [ ] Cards: imagen + badge + category + progress + efficiency + buttons
- [ ] Stats: icon + title + value + trend
- [ ] Buttons: primary + secondary + icon + disabled
- [ ] Badges: category + status + efficiency
- [ ] Sidebar: activa correctamente
- [ ] Breadcrumbs: muestran path

### Interacciones (Verificar Functionality)

- [ ] Hover effects smooth (200-300ms)
- [ ] Links navegaban correctamente
- [ ] Sidebar active state actualiza en cada página
- [ ] Buttons tienen cursor pointer
- [ ] Cards tienen hover transform
- [ ] Modales abren/cierran smooth

### Responsividad (Verificar en 3 Viewports)

- [ ] Móvil (320px):
  - [ ] Sidebar hidden
  - [ ] Grid: 1 columna
  - [ ] Top nav adapta
  - [ ] Buttons full width

- [ ] Tablet (768px):
  - [ ] Sidebar visible
  - [ ] Grid: 2 columnas
  - [ ] Padding adapta
  - [ ] All working

- [ ] Desktop (1024px+):
  - [ ] Sidebar sticky
  - [ ] Grid: 3 columnas
  - [ ] Max-width respetado
  - [ ] Layout perfecto

---

## 📊 MATRIZ DE CONSISTENCIA VISUAL

| Elemento | Landing | Dashboard | Tracker | Proyectos |
|----------|---------|-----------|---------|-----------|
| **Logo Branding** | ✓ | ✓ | ✓ | ✓ |
| **Color Primary** | ✓ | ✓ | ✓ | ✓ |
| **Typography** | ✓ | ✓ | ✓ | ✓ |
| **Spacing System** | ✓ | ✓ | ✓ | ✓ |
| **Sidebar Nav** | - | ✓ | ✓ | ✓ |
| **Top Navigation** | ✓ | ✓ | ✓ | ✓ |
| **Cards Design** | ✓ | ✓ | ✓ | ✓ |
| **Buttons** | ✓ | ✓ | ✓ | ✓ |
| **Badges** | ✓ | ✓ | ✓ | ✓ |
| **Icons (Material)** | ✓ | ✓ | ✓ | ✓ |
| **Hover Effects** | ✓ | ✓ | ✓ | ✓ |
| **Dark Mode Ready** | ✓ | ✓ | ✓ | ✓ |

**Conclusión**: ✅ 100% Sistema Homogéneo

---

## 🎓 RECOMENDACIONES FINALES PARA ENTREGA

### Lo que hace "Profesional" este Proyecto

1. **Consistencia Visual** 
   - Un solo color scheme
   - Tipografía unificada
   - Espaciado sistemático

2. **Navegación Clara**
   - Usuario siempre sabe dónde está
   - Indicadores visuales de página activa
   - Paths lógicos entre secciones

3. **Componentes Reutilizables**
   - Cards del mismo tamaño/estilo
   - Botones predecibles
   - Badges consistentes

4. **Responsive Design**
   - Se ve bien en mobile/tablet/desktop
   - No hay "breaks" en layout

5. **Transiciones Smooth**
   - No hay saltos abruptos
   - Animaciones sutiles pero presentes
   - Sensación de aplicación "pulida"

### Puntos a Verificar Antes de Entregar

✅ **Visual Audit**:
- [ ] Todos los colores son de la paleta oficial
- [ ] Tipografía es consistente
- [ ] Espaciado sigue el grid
- [ ] Nada se ve "desalineado"

✅ **Navigation Audit**:
- [ ] Todos los links funcionan
- [ ] Indicador activo funciona
- [ ] Breadcrumbs son claros
- [ ] Sidebar es usable

✅ **Component Audit**:
- [ ] Todos los cards son iguales
- [ ] Botones tienen los mismos estilos
- [ ] Badges son consistentes
- [ ] Icons están alineados

✅ **Responsive Audit**:
- [ ] Prueba en mobile (375px)
- [ ] Prueba en tablet (768px)
- [ ] Prueba en desktop (1440px)
- [ ] No hay broken layouts

✅ **Brand Audit**:
- [ ] Landing se ve profesional
- [ ] App pages se ven como "parte del mismo universo"
- [ ] Colores no varían
- [ ] Logo es consistente

---

## 📝 CONCLUSIÓN

Este sistema de diseño garantiza que tu prototipo tenga **coherencia profesional** necesaria para una entrega de Master de UX/UI. 

**Lo importante**:
- ✅ Consistencia sobre innovación
- ✅ Claridad sobre complejidad
- ✅ Sistema sobre casos especiales
- ✅ Profesionalismo sobre experimentación

**Resultado final**: Una plataforma que se ve como **producto terminado**, no como prototipo.

---

**Documento generado**: Marzo 2026  
**Para**: Entrega Master UX/UI  
**Estado**: Ready for Delivery ✅
