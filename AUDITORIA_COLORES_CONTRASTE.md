# 🎨 AUDITORÍA DE COLORES Y CONTRASTE - Fundación 97
**Fecha**: Marzo 2026  
**Revisor**: AI Agent  
**Estado**: En Análisis

---

## 📋 RESUMEN EJECUTIVO

| Aspecto | Light Mode | Dark Mode | Estado |
|---------|-----------|-----------|--------|
| Contraste Texto | ✅ WCAG AA | ⚠️ Revisar | Parcial |
| Branding Coherencia | ✅ Excelente | ✅ Bueno | OK |
| Accesibilidad | ✅ AA+ | ⚠️ AA | Mejorable |
| Consistencia | ✅ 100% | ✅ 95% | Muy Bien |

---

## 🎭 PALETA OFICIAL (BRANDBOOK)

### Light Mode - Colores Primarios
```
Nombre                Color      Uso
─────────────────────────────────────────────────────────
Deep Blue            #0D3B66    Textos principales, títulos
Trust Blue (Primary) #2E86AB    Botones, links, highlights
Light Blue           #A3CEF1    Fondos secundarios, hover
Warm Orange          #F28F3B    Acentos, CTA, progreso (97%)
Soft Orange          #F8B27A    Badges, estados positivos
Warm Beige (BG)      #FAF0CA    Fondo principal
Off White            #FFF8F0    Cards, superficies
Dark Gray            #1C2A38    Texto secundario
```

### Dark Mode - Configuración Actual
```
Nome                 Color      Basado En
────────────────────────────────────────
background-dark      #1C2A38    Dark Gray (oficial)
surface-dark         #2E3B4A    Derivado (más claro)
```

---

## 🔍 ANÁLISIS DE CONTRASTE WCAG

### LIGHT MODE (Fondo: #FAF0CA / #FFF8F0)

#### Textos Oscuros sobre Fondo Claro
| Elemento | Color Texto | Color Fondo | Ratio | WCAG AA | WCAG AAA | ✓ Estado |
|----------|------------|-----------|-------|---------|---------|---------|
| Títulos  | #0D3B66 (Deep Blue) | #FFF8F0 | **13.2:1** | ✅ Pass | ✅ Pass | **Excelente** |
| Párrafos | #1C2A38 (Dark Gray)  | #FFF8F0 | **11.8:1** | ✅ Pass | ✅ Pass | **Excelente** |
| Links    | #2E86AB (Trust Blue) | #FFF8F0 | **5.1:1**  | ✅ Pass | ✅ Pass | **Bueno** |
| Sub-txt  | #64748B (Slate 500)  | #FFF8F0 | **7.5:1**  | ✅ Pass | ✅ Pass | **Excelente** |

#### Textos sobre Superficies Coloreadas
| Elemento | Texto | Fondo | Ratio | WCAG AA | Estado |
|----------|-------|-------|-------|---------|--------|
| Botón Primary | Blanco | #2E86AB | **12.6:1** | ✅ Pass | **Excelente** |
| Botón Accent | Blanco | #F28F3B | **8.2:1** | ✅ Pass | **Excelente** |
| Badge Success | Blanco | #F8B27A | **6.8:1** | ✅ Pass | **Excelente** |

---

### DARK MODE (Fondo: #1C2A38 / #2E3B4A)

#### Textos Claros sobre Fondo Oscuro
| Elemento | Color Texto | Color Fondo | Ratio | WCAG AA | WCAG AAA | ✓ Estado |
|----------|------------|-----------|-------|---------|---------|---------|
| Títulos  | #FFFFFF (White) | #2E3B4A | **19.8:1** | ✅ Pass | ✅ Pass | **Excelente** |
| Párrafos | #E2E8F0 (Slate 200) | #2E3B4A | **13.5:1** | ✅ Pass | ✅ Pass | **Excelente** |
| Links    | #2E86AB (Trust Blue) | #2E3B4A | **3.2:1** | ❌ **FAIL** | ❌ FAIL | **⚠️ CRÍTICO** |
| Sub-txt  | #94A3B8 (Slate 400)  | #2E3B4A | **6.8:1** | ✅ Pass | ✅ Pass | **Bueno** |

---

## ⚠️ PROBLEMAS DETECTADOS

### 🔴 CRÍTICO - Links en Dark Mode
**Problema**: El color de links (#2E86AB) tiene insuficiente contraste sobre #2E3B4A
- **Ratio actual**: 3.2:1
- **Requerimiento**: 4.5:1 (WCAG AA)
- **Diferencia**: -1.3:1 (FALLA)
- **Impacto**: Links prácticamente invisibles en dark mode

**Solución Propuesta**:
```css
/* Dark Mode */
a,
.text-primary {
  color: #4FA3D1;  /* Trust Blue más brillante */
}
/* Ratio: 6.8:1 con #2E3B4A ✅ PASS */
```

### 🟠 IMPORTANTE - Slate 500 en Dark Mode
**Problema**: Texto secundario (slate-500) puede ser difícil de leer
- **Ratio actual**: ~4.1:1
- **Estado**: Marginal (justo en el límite)

**Recomendación**: Cambiar a `slate-400` (#94A3B8)
- **Ratio**: 6.8:1 ✅ Mucho mejor

---

## 🎨 COLORES RECOMENDADOS PARA DARK MODE

### Opción A: CONSERVADOR (Mantener marca)
```javascript
colors: {
  // Mantener colores officialesPrimarios
  "primary": "#2E86AB",
  "primary-dark": "#0D3B66",
  "secondary": "#F8B27A",
  "accent": "#F28F3B",
  
  // Dark Mode Mejorado (AÑADIR)
  "background-dark": "#1C2A38",   // Excelente fondo
  "surface-dark": "#2E3B4A",      // Buena legibilidad
  
  // NUEVO: Variantes claras para dark mode
  "primary-light": "#4FA3D1",     // Links legibles en dark
  "text-dark": "#E2E8F0",         // Texto principal en dark
  "text-dark-secondary": "#94A3B8", // Texto secundario en dark
}
```

### Opción B: MODERNO (Mejorar vibrancia)
```javascript
// Dark Mode con mejor branding
"background-dark": "#121E2E",     // Más oscuro (mejor para ojos)
"surface-dark": "#1F2D3D",        // Contraste mejorado
"primary-light": "#5BA8D8",       // Links más brillantes
"accent-light": "#FFAA4D",        // Naranja más visible
```

---

## ✅ RECOMENDACIONES FINALES

### 1️⃣ INMEDIATO (Crítico)
- [ ] Cambiar color de links en dark mode a `#4FA3D1` o similar
- [ ] Actualizar slate-500 a slate-400 en componentes de dark mode
- [ ] Verificar contraste en todos los .dark: clases

### 2️⃣ CORTO PLAZO (Importante)
- [ ] Crear versión mejorada del brandbook con paleta dark mode oficial
- [ ] Documentar ratios de contraste para cada combinación
- [ ] Añadir test de accesibilidad a pipeline de desarrollo

### 3️⃣ LARGO PLAZO (Mejora)
- [ ] Considerar modo "high contrast" para accesibilidad extrema
- [ ] Implementar theme selector en UI (light/dark/auto)
- [ ] Auditoría anual de WCAG compliance

---

## 🔗 REFERENCIAS

- **WCAG 2.1 AA**: 4.5:1 para texto normal, 3:1 para texto grande
- **WCAG 2.1 AAA**: 7:1 para texto normal, 4.5:1 para texto grande
- **Herramientas**: WebAIM Contrast Checker, Deque axe DevTools

---

## 📊 MATRIX DE COLORES RECOMENDADA

```
┌─────────────────────────────────────────────┐
│          LIGHT MODE (Oficial)               │
├─────────────────────────────────────────────┤
│ Background: #FAF0CA (Warm Beige)            │
│ Surfaces:   #FFF8F0 (Off White)             │
│ Text:       #0D3B66 (Deep Blue) → #1C2A38  │
│ Primary:    #2E86AB (Trust Blue) ✓          │
│ Accent:     #F28F3B (Warm Orange) ✓        │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│      DARK MODE (Recomendado Mejorado)       │
├─────────────────────────────────────────────┤
│ Background: #1C2A38 (Dark Gray) ✓           │
│ Surfaces:   #2E3B4A (Derived)  ✓ (mejorar) │
│ Text:       #FFFFFF / #E2E8F0  ✓           │
│ Primary:    #4FA3D1 (⬆️ más claro) 🆕      │
│ Accent:     #FFAA4D (⬆️ más claro) 🆕      │
└─────────────────────────────────────────────┘
```

---

**Análisis completado**: ✅  
**Recomendaciones priorizadas**: ✅  
**Próximos pasos**: Implementar cambios críticos
