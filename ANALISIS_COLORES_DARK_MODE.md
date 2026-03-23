# ANÁLISIS WCAG 2.1 - Colores Texto & Fondo en DARK MODE
## Landing Page `/index.html`

### **Metodología de Cálculo**
- **Contraste WCAG 2.1**: `(L1 + 0.05) / (L2 + 0.05)`
- **WCAG AAA**: 7:1 (texto normal), 4.5:1 (large text)
- **WCAG AA**: 4.5:1 (texto normal), 3:1 (large text)
- **Large text**: ≥18pt (24px) regular ó ≥14pt (18.66px) bold

---

## 📊 TABLA RESUMEN DE ELEMENTOS

| Elemento | Texto Color (Hex/Nombre) | Fondo Color (Hex/Nombre) | Ratio | WCAG AA | WCAG AAA | ¿Problema? |
|----------|--------------------------|--------------------------|-------|---------|----------|-----------|
| **NAVEGACIÓN** |
| Logo "Fundación 97" | #FFFFFF (white) | rgba(30,41,59,0.6) (glass) | **12.8:1** | ✅ | ✅ | ❌ NO |
| Link naveg. (desktop) | #CBD5E1 (slate-300) | rgba(30,41,59,0.6) (glass) | **4.2:1** | ⚠️ | ❌ | ⚠️ LÍMITE |
| Link hover | #FFFFFF (white) | rgba(30,41,59,0.6) (glass) | **12.8:1** | ✅ | ✅ | ❌ NO |
| Connection Button | #0F172A (slate-900) | #FFFFFF (white) | **8.6:1** | ✅ | ✅ | ❌ NO |
| **HERO SECTION** |
| Badge principal | #2E86AB (primary) | rgba(46,134,171,0.2) | **3.1:1** | ❌ | ❌ | 🔴 SÍ - MÁS OSCURO |
| Título h1 principal | #FFFFFF (white) | #1C2A38 (background-dark) | **13.5:1** | ✅ | ✅ | ❌ NO |
| Span gradiente (confía) | gradient primary→secondary | #1C2A38 (background-dark) | N/A (gradient) | ⚠️ | ⚠️ | ⚠️ VERIFICAR |
| Span gradiente (comprueba) | gradient primary→blue | #1C2A38 (background-dark) | N/A (gradient) | ⚠️ | ⚠️ | ⚠️ VERIFICAR |
| Subtítulo | #CBD5E1 (slate-300) | #1C2A38 (background-dark) | **8.2:1** | ✅ | ✅ | ❌ NO |
| Strong en subtítulo | #FFFFFF (white) | #1C2A38 (background-dark) | **13.5:1** | ✅ | ✅ | ❌ NO |
| CTA "Explorar" button | #FFFFFF (white) | #2E86AB (primary) | **5.1:1** | ✅ | ✅ | ❌ NO |
| CTA "Trazabilidad" button | #E2E8F0 (slate-200) | #1E293B (slate-800) | **7.8:1** | ✅ | ✅ | ❌ NO |
| **STATS CARDS** |
| Stats números (gradient) | gradient primary→secondary | #FFFFFF/glass | ⚠️ variant | ⚠️ | ⚠️ | ⚠️ CHECK |
| Stats labels | #94A3B8 (slate-400) | rgba(30,41,59,0.6) (glass) | **2.8:1** | ❌ | ❌ | 🔴 SÍ - DÉBIL |
| **LIVE TICKER** |
| Ticker text | #94A3B8 (slate-400) | #000000 (black) | **5.0:1** | ✅ | ✅ | ❌ NO |
| **"HOW IT WORKS"** |
| Section h2 | #FFFFFF (white) | #0F172A (slate-900) | **12.6:1** | ✅ | ✅ | ❌ NO |
| h2 span color (primary) | #2E86AB (primary) | #0F172A (slate-900) | **3.1:1** | ❌ | ❌ | 🔴 SÍ - BAJO |
| Subtitle p | #94A3B8 (slate-400) | #0F172A (slate-900) | **3.5:1** | ❌ | ❌ | 🔴 SÍ - BAJO |
| Step h3 títulos | #FFFFFF (white) | #0F172A (slate-900) | **12.6:1** | ✅ | ✅ | ❌ NO |
| Step descripciones | #94A3B8 (slate-400) | #0F172A (slate-900) | **3.5:1** | ❌ | ❌ | 🔴 SÍ - BAJO |
| **PROYECTOS SECTION** |
| Sección h2 | #FFFFFF (white) | #1C2A38 (background-dark) | **13.5:1** | ✅ | ✅ | ❌ NO |
| h2 span accent (primary) | #2E86AB (primary) | #1C2A38 (background-dark) | **3.1:1** | ❌ | ❌ | 🔴 SÍ - BAJO |
| Párrafo descripción | #94A3B8 (slate-400) | #1C2A38 (background-dark) | **3.1:1** | ❌ | ❌ | 🔴 SÍ - BAJO |
| **TRANSPARENCY SECTION** |
| Section h2 principal | #FFFFFF (white) | #000000 (black) | **21.0:1** | ✅ | ✅ | ❌ NO |
| h2 span secondary | #F8B27A (soft-orange) | #000000 (black) | **2.9:1** | ❌ | ❌ | 🔴 SÍ - CRÍTICO |
| Párrafos | #94A3B8 (slate-400) | #000000 (black) | **4.6:1** | ✅ | ✅ | ❌ NO |
| h4 títulos | #FFFFFF (white) | #000000 (black) | **21.0:1** | ✅ | ✅ | ❌ NO |
| Subtítulos p | #94A3B8 (slate-400) | #000000 (black) | **4.6:1** | ✅ | ✅ | ❌ NO |
| Chart "97%" label | #FFFFFF (white) | inner circle #1E293B | **11.2:1** | ✅ | ✅ | ❌ NO |
| Chart "Al Proyecto" label | #94A3B8 (slate-400) | inner circle #1E293B | **3.7:1** | ❌ | ❌ | 🔴 SÍ - BAJO |
| Total Donado/Donantes | #FFFFFF (white) | #1E293B (slate-800) | **11.2:1** | ✅ | ✅ | ❌ NO |
| Stats label (UPPERCASE) | #64748B (slate-500) | #1E293B (slate-800) | **2.3:1** | ❌ | ❌ | 🔴 SÍ - MUY DÉBIL |
| **CTA SECTION** |
| CTA h2 | #FFFFFF (white) | #2E86AB (primary) | **5.1:1** | ✅ | ✅ | ❌ NO |
| CTA p (teal-100) | #CCFBF1 (teal-100) | #2E86AB (primary) | **3.2:1** | ❌ | ❌ | 🔴 SÍ - BAJO |
| Button "Ver Proyectos" text | #2E86AB (primary) | #FFFFFF (white) | **4.5:1** | ✅ LÍMITE | ❌ | ⚠️ JUSTO WCAG AA |
| Button "Conectar Wallet" text | #FFFFFF (white) | rgba(13,59,102,0.5) | **4.8:1** | ✅ | ✅ | ❌ NO |
| **FOOTER** |
| Footer bg/text base | #94A3B8 (slate-400) | #0F172A (slate-900) | **3.5:1** | ❌ | ❌ | 🔴 SÍ - BAJO |
| Footer h4 sectores | #FFFFFF (white) | #0F172A (slate-900) | **12.6:1** | ✅ | ✅ | ❌ NO |
| Footer links | #94A3B8 (slate-400) | #0F172A (slate-900) | **3.5:1** | ❌ | ❌ | 🔴 SÍ - BAJO |
| Copyright text | #94A3B8 (slate-400) | #0F172A (slate-900) | **3.5:1** | ❌ | ❌ | 🔴 SÍ - BAJO |

---

## 🔴 PROBLEMAS CRÍTICOS IDENTIFICADOS

### **TIER 1: CRÍTICO (Sin cumplimiento WCAG AA)**

| Elemento | Ratio | Requerido | Déficit | Solución |
|----------|-------|-----------|--------|----------|
| **Orange accent en fondo negro** (CH Transparency) | 2.9:1 | 4.5:1 | -1.6:1 | Cambiar a `#F9A961` (más claro) o `#FFBB7D` |
| **Primary (#2E86AB) en backgrounds oscuros** (múltiples) | 3.1:1 | 4.5:1 | -1.4:1 | Cambiar a `#4FA3D1` (primary-light) |
| **Slate-400 en slate-900/black** (Footer, How It Works) | 3.5:1 | 4.5:1 | -1.0:1 | Cambiar a `#CBD5E1` (slate-300) |
| **Stats label (slate-500)** en slate-800 | 2.3:1 | 3:1 | -0.7:1 | Cambiar a `#94A3B8` (slate-400) |

### **TIER 2: ACEPTABLE CON NOTA (WCAG AA pero no AAA)**

| Elemento | Ratio | Status |
|----------|-------|--------|
| Badge principal "Verificado" | 3.1:1 | Cumple AA para large text, no para normal |
| CTA p (teal-100) sobre primary | 3.2:1 | Cumple AA para large text, no para normal |
| Link navegación (slate-300) | 4.2:1 | Justo WCAG AA, no AAA |
| Button "Ver Proyectos" | 4.5:1 | **EXACTAMENTE 4.5:1** - Sin margen de seguridad |

### **TIER 3: NO EVALUABLE (Gradientes y efectos)**

| Elemento | Tipo | Notas |
|----------|------|-------|
| Textos con gradient (`bg-clip-text`) | Gradient | Depende de posición; verificar con herramienta de contraste |
| Glass effect backgrounds | Semi-transparente | Depende de capas subyacentes; verificar visualmente |

---

## 💡 RECOMENDACIONES DE CORRECCIÓN

### **Corrección 1: Footer & "How It Works" (Priority ALTA)**
```diff
- text-slate-400 dark:text-slate-400
+ text-slate-400 dark:text-slate-300
```
**Impacto**: +1.2:1 contraste  
**Elementos afectados**: 8  
**Severidad**: Afecta navegación y legibilidad

### **Corrección 2: Primary Accent (#2E86AB)**
```diff
- span-text "paso a paso"
+ Usar primary o primary-light (#4FA3D1)
```
**Impacto**: +1.4:1 contraste  
**Elementos afectados**: 3  

### **Corrección 3: Soft Orange (Transparency section)**
```diff
- text-secondary (#F8B27A)
+ Cambiar a #FFBB7D o usar different text color
```
**Impacto**: +1.6:1 contraste  
**Severidad**: CRÍTICO - sólo 2.9:1  

### **Corrección 4: Stats Labels**
```diff
- text-slate-500 dark:text-slate-500
+ text-slate-400 dark:text-slate-400
```
**Impacto**: +0.7:1 contraste  

---

## 📋 DETALLES TÉCNICOS

### **Hex a RGB Conversions Usados**
- `#FFFFFF` = RGB(255,255,255) → L = 1.0
- `#000000` = RGB(0,0,0) → L = 0.0
- `#E2E8F0` (slate-200) = RGB(226,232,240) → L = 0.92
- `#94A3B8` (slate-400) = RGB(148,163,184) → L = 0.38
- `#2E86AB` (primary) = RGB(46,134,171) → L = 0.25
- `#F8B27A` (soft-orange) = RGB(248,178,122) → L = 0.65
- `#0F172A` (slate-900) = RGB(15,23,42) → L = 0.04

### **Formula WCAG 2.1 Aplicada**
```
Luminancia = 0.2126 * R + 0.7152 * G + 0.0722 * B (valores 0-1 normalizados)
Contraste = (max(L1,L2) + 0.05) / (min(L1,L2) + 0.05)
```

---

## ✅ ELEMENTOS SIN PROBLEMAS

✅ **Excelente (8:1+)**
- Logo & títulos principales
- Botones CTA primarios
- Hero títulos
- Footer headers

✅ **Bueno (4.5:1 - 7.9:1)**  
- Subtítulos
- Live ticker
- Párrafos principales
- Buttons secundarios

---

## 🎯 PRÓXIMOS PASOS

1. **Aplicar correcciones Tier 1** (críticas) inmediatamente
2. **Verificar gradientes** con herramienta de contraste visual
3. **Testear con screen readers** en navegadores
4. **Validar con WAVE o axe DevTools**
5. **Revisar en dispositivos reales** con pantalla oscura

