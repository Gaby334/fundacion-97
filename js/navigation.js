/**
 * NavigationManager - Centraliza la navegación de toda la aplicación
 * Debe cargarse PRIMERO antes que otros scripts
 * 
 * Responsabilidades:
 * - Detectar la página actual automáticamente
 * - Generar paths relativos correctos
 * - Mantener el estado de la navegación activa
 * - Sincronizar el estado del wallet en el header
 * - Manejar el menú móvil
 */

class NavigationManager {
    constructor() {
        this.currentPage = 'home';
        this.walletConnected = false;
        this.walletAddress = null;
        this.networkId = null;
        this.initialized = false;
    }

    /**
     * Inicializar NavigationManager
     * Detecta la página actual y configura listeners
     */
    init() {
        this.detectCurrentPage();
        this.setupMobileMenu();
        this.syncActiveLinks();
        this.initialized = true;
        console.log(`✅ NavigationManager inicializado - Página: ${this.currentPage}`);
    }

    /**
     * Detectar la página actual basado en window.location
     */
    detectCurrentPage() {
        const pathname = window.location.pathname;
        const filename = pathname.split('/').pop();

        if (filename === '' || filename === 'index.html' || pathname.includes('index.html')) {
            this.currentPage = 'home';
        } else if (pathname.includes('dashboard.html')) {
            this.currentPage = 'dashboard';
        } else if (pathname.includes('tracker.html')) {
            this.currentPage = 'tracker';
        } else if (pathname.includes('proyectos.html') || pathname.includes('projects')) {
            this.currentPage = 'projects';
        } else if (pathname.includes('donar.html')) {
            this.currentPage = 'donar';
        } else {
            this.currentPage = 'home';
        }
    }

    /**
     * Obtener la ruta relativa correcta desde la página actual
     * Ej: desde /pages/dashboard.html → 'tracker.html'
     *     desde /index.html → 'pages/dashboard.html'
     */
    getRelativePath(targetPage) {
        const isCurrentHome = this.currentPage === 'home';
        const isTargetHome = targetPage === 'home';

        // Mapeo de páginas a archivos
        const pageMap = {
            'home': isCurrentHome ? 'index.html' : '../index.html',
            'dashboard': isCurrentHome ? 'pages/dashboard.html' : 'dashboard.html',
            'tracker': isCurrentHome ? 'pages/tracker.html' : 'tracker.html',
            'projects': isCurrentHome ? 'pages/proyectos.html' : 'proyectos.html',
            'donar': isCurrentHome ? 'pages/donar.html' : 'donar.html'
        };

        return pageMap[targetPage] || pageMap['home'];
    }

    /**
     * Sincronizar links activos (mostrar página actual como activa)
     */
    /**
     * Sincronizar links activos (mostrar página actual como activa)
     */
    syncActiveLinks() {
        const navLinks = document.querySelectorAll('[data-nav-link]');
        
        navLinks.forEach(link => {
            const page = link.dataset.navLink;
            
            if (page === this.currentPage) {
                // Agregar clase active al link de la página actual
                link.classList.add('active');
            } else {
                // Remover clase active de otros links
                link.classList.remove('active');
            }
        });
    }

    /**
     * Configurar menú móvil (abrir/cerrar, auto-cerrar en click)
     */
    setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('[data-mobile-menu-button]');
        const mobileMenu = document.querySelector('[data-mobile-menu]');

        if (!mobileMenuBtn || !mobileMenu) return;

        // Toggle menu
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });

        // Cerrar al hacer click en un link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // Cerrar al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    /**
     * Actualizar estado del wallet en el header
     */
    updateWalletStatus(address, connected = true, networkId = null) {
        this.walletAddress = address;
        this.walletConnected = connected;
        this.networkId = networkId;

        // Actualizar elementos del DOM
        const connectBtn = document.getElementById('connectWalletBtn');
        const walletInfo = document.getElementById('walletInfo');
        const walletAddress = document.getElementById('walletAddress');
        const networkStatus = document.getElementById('networkStatus');

        if (connected && address) {
            if (connectBtn) connectBtn.classList.add('hidden');
            if (walletInfo) walletInfo.classList.remove('hidden');
            if (walletAddress) {
                walletAddress.textContent = address.substring(0, 6) + '...' + address.substring(-4);
            }
            if (networkStatus) {
                networkStatus.classList.remove('hidden');
                if (networkId === '0x13881') {
                    // Mumbai Testnet
                    networkStatus.innerHTML = `
                        <div class="size-2 rounded-full bg-yellow-400"></div>
                        <span class="text-xs font-bold">Mumbai Testnet</span>
                    `;
                } else if (networkId === '0x89') {
                    // Polygon Mainnet
                    networkStatus.innerHTML = `
                        <div class="size-2 rounded-full bg-green-500"></div>
                        <span class="text-xs font-bold">Polygon Mainnet</span>
                    `;
                } else {
                    networkStatus.innerHTML = `
                        <div class="size-2 rounded-full bg-slate-400"></div>
                        <span class="text-xs font-bold">Red desconocida</span>
                    `;
                }
            }
        } else {
            if (connectBtn) connectBtn.classList.remove('hidden');
            if (walletInfo) walletInfo.classList.add('hidden');
            if (networkStatus) networkStatus.classList.add('hidden');
        }
    }

    /**
     * Navegar a una página
     */
    navigateTo(page) {
        const path = this.getRelativePath(page);
        window.location.href = path;
    }

    /**
     * Obtener información actual
     */
    getInfo() {
        return {
            currentPage: this.currentPage,
            walletConnected: this.walletConnected,
            walletAddress: this.walletAddress,
            networkId: this.networkId
        };
    }
}

// Instanciar globalmente
window.navigationManager = new NavigationManager();

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.navigationManager.init();
    });
} else {
    // DOM ya está cargado
    window.navigationManager.init();
}
