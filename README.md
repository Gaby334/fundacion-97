# 🌍 Fundación 97 - Plataforma de Donaciones Transparentes en Blockchain

**Transparencia Radical**: 97% de cada donación llega directamente a los proyectos. 3% cubre operaciones. Todo verificable en blockchain.

## ⚡ Inicio Rápido

### Para Desarrolladores

```bash
# Clonar con submodules
git clone --recurse-submodules https://github.com/Gaby334/fundacion-97.git
cd fundacion-97/Web

# Abrir en navegador (local)
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

### Para Conocer el Proyecto

1. **Quick Start**: [docs/guias/QUICK_START_DEV.md](docs/guias/QUICK_START_DEV.md) (5 min)
2. **Documentación Completa**: [docs/README.md](docs/README.md) (índice navegable)
3. **Arquitectura Técnica**: [docs/arquitectura/ARQUITECTURA_TECNICA.md](docs/arquitectura/ARQUITECTURA_TECNICA.md) (para senior devs)

## 📁 Estructura del Proyecto

```
.                    # Raíz del repositorio
├── index.html       # Landing page
├── pages/           # Dashboard, Tracker, Proyectos
├── js/              # Módulos JavaScript
│   ├── navigation.js    # Gestor centralizado de navegación
│   ├── ui.js            # UI Manager y temas
│   ├── blockchain.js    # Web3 y MetaMask
│   └── donations.js     # Lógica de donaciones
├── css/             # Estilos (Tailwind CSS v3)
├── data/            # proyectos.json
├── docs/            # Documentación técnica completa
└── fundacion-97/    # Submodule (mirror)
```

## 🎯 Estado Actual (Marzo 2026)

| Componente | Estado | Progreso |
|-----------|--------|----------|
| **Frontend UI** | ✅ Completado | 100% |
| **Navegación** | ✅ Completado | 100% |
| **JavaScript** | ✅ Completado | 85% |
| **Blockchain** | 🚧 En progreso | 50% (testnet ready) |
| **Smart Contract** | 🚧 Diseñado | 0% (pending) |

## 📚 Documentación

- **[docs/README.md](docs/README.md)** - Índice principal
- **[docs/guias/](docs/guias/)** - Guías prácticas para desarrolladores
- **[docs/arquitectura/](docs/arquitectura/)** - Especificaciones técnicas detalladas
- **[docs/project-info/](docs/project-info/)** - Análisis del proyecto y roadmap

## 🛠️ Tecnologías

- **Frontend**: Vanilla HTML/CSS/JavaScript (sin frameworks)
- **CSS**: Tailwind CSS v3 (CDN)
- **Blockchain**: Web3.js + MetaMask
- **Network**: Polygon (Mainnet + Mumbai Testnet)
- **Deployment**: Vercel (automático con cada push a `main`)

## 🚀 Deployment

El proyecto está en **producción** en Vercel:

```
https://fundacion-97.vercel.app
```

Se actualiza automáticamente con cada push a la rama `main`.

## 📋 Características Implementadas

- ✅ Landing page responsiva
- ✅ Dashboard con estadísticas
- ✅ Página de proyectos con búsqueda y filtros
- ✅ Tracker de donaciones
- ✅ Navegación centralizada y consistente
- ✅ Conexión MetaMask integrada
- ✅ Modal de donaciones
- ✅ Sistema UI Manager (dark mode, notificaciones)

## 🔄 Flujo de Desarrollo

```
Feature Branch → Push → Vercel Auto-Deploy → Live
```

Para cambios nuevos:
1. Crear rama: `git checkout -b feature/nombre`
2. Hacer cambios y commit
3. Push: `git push origin feature/nombre`
4. Vercel deploya automáticamente

## 📞 Información Adicional

Para más detalles técnicos:
- Lee primero: [docs/00_INDICE_LEER_AQUI.txt](docs/00_INDICE_LEER_AQUI.txt)
- Análisis detallado: [docs/project-info/DOCUMENTO_MAESTRO.md](docs/project-info/DOCUMENTO_MAESTRO.md)

---

**Última actualización**: Marzo 2026  
**Estado**: ✅ Producción en Vercel  
**Licencia**: MIT
