/**
 * FUNDACIÓN 97 - UI Manager
 * Sistema central de gestión de interfaz de usuario
 * Versión: 1.0.0
 */

class UIManager {
    constructor() {
        this.darkMode = false;
        this.mobileMenuOpen = false;
        this.notifications = [];
    }

    /**
     * Inicializar UI Manager
     */
    init() {
        this.setupDarkMode();
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupAnimationsOnScroll();
        console.log('✅ UIManager inicializado');
    }

    /**
     * Dark Mode Toggle
     */
    setupDarkMode() {
        // Detectar preferencia del sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.darkMode = true;
            document.documentElement.classList.add('dark');
        }

        // Listener para cambios
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => {
                this.toggleDarkMode();
            });
        }
    }

    /**
     * Toggle Dark Mode
     */
    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('darkMode', this.darkMode);
    }

    /**
     * Setup Mobile Menu
     */
    setupMobileMenu() {
        const menuButton = document.querySelector('[data-mobile-menu-button]');
        const mobileMenu = document.querySelector('[data-mobile-menu]');

        if (menuButton && mobileMenu) {
            menuButton.addEventListener('click', () => {
                this.mobileMenuOpen = !this.mobileMenuOpen;
                mobileMenu.classList.toggle('hidden');
                menuButton.classList.toggle('active');
            });
        }
    }

    /**
     * Smooth Scroll para enlaces internos
     */
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Animaciones al hacer scroll
     */
    setupAnimationsOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('section, .card, .stat-card').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Mostrar notificación toast
     */
    showNotification(message, type = 'info', duration = 3000) {
        const id = Date.now();
        const colors = {
            success: { bg: 'bg-green-500', icon: 'check_circle' },
            error: { bg: 'bg-red-500', icon: 'error' },
            warning: { bg: 'bg-yellow-500', icon: 'warning' },
            info: { bg: 'bg-blue-500', icon: 'info' }
        };

        const config = colors[type] || colors.info;

        const notification = document.createElement('div');
        notification.id = `notification-${id}`;
        notification.className = `fixed top-6 right-6 ${config.bg} text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 transform translate-x-0 opacity-100 transition-all duration-300`;
        notification.style.animation = 'slideInRight 0.3s ease-out';
        notification.innerHTML = `
            <span class="material-symbols-outlined text-2xl">${config.icon}</span>
            <span class="font-semibold">${message}</span>
            <button onclick="uiManager.closeNotification(${id})" class="ml-2 hover:opacity-70 transition-opacity">
                <span class="material-symbols-outlined">close</span>
            </button>
        `;

        document.body.appendChild(notification);
        this.notifications.push(id);

        // Auto-remove después del duration
        setTimeout(() => {
            this.closeNotification(id);
        }, duration);
    }

    /**
     * Cerrar notificación
     */
    closeNotification(id) {
        const notification = document.getElementById(`notification-${id}`);
        if (notification) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
                this.notifications = this.notifications.filter(n => n !== id);
            }, 300);
        }
    }

    /**
     * Mostrar loading spinner
     */
    showLoading(target = 'body') {
        const loader = document.createElement('div');
        loader.id = 'global-loader';
        loader.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center';
        loader.innerHTML = `
            <div class="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl">
                <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                <p class="text-slate-700 font-semibold">Procesando...</p>
            </div>
        `;
        document.body.appendChild(loader);
    }

    /**
     * Ocultar loading spinner
     */
    hideLoading() {
        const loader = document.getElementById('global-loader');
        if (loader) {
            loader.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => loader.remove(), 300);
        }
    }

    /**
     * Crear modal genérico
     */
    createModal(title, content, actions = []) {
        const modalId = `modal-${Date.now()}`;
        const modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4';
        
        let actionsHTML = '';
        actions.forEach(action => {
            actionsHTML += `
                <button 
                    onclick="${action.onClick}" 
                    class="${action.class || 'bg-primary text-white'} px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
                >
                    ${action.label}
                </button>
            `;
        });

        modal.innerHTML = `
            <div class="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                <div class="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <h2 class="text-2xl font-bold text-slate-900 dark:text-white">${title}</h2>
                    <button onclick="uiManager.closeModal('${modalId}')" class="text-slate-400 hover:text-slate-600 transition-colors">
                        <span class="material-symbols-outlined text-2xl">close</span>
                    </button>
                </div>
                <div class="p-6 overflow-y-auto max-h-[60vh]">
                    ${content}
                </div>
                ${actionsHTML ? `
                    <div class="p-6 border-t border-slate-200 dark:border-slate-700 flex gap-3 justify-end">
                        ${actionsHTML}
                    </div>
                ` : ''}
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Cerrar al hacer clic fuera
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modalId);
            }
        });

        // Cerrar con tecla ESC
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeModal(modalId);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);

        return modalId;
    }

    /**
     * Cerrar modal
     */
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.animation = 'fadeOut 0.2s ease-out';
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = 'auto';
            }, 200);
        }
    }

    /**
     * Formatear números con separadores de miles
     */
    formatNumber(num, decimals = 0) {
        return new Intl.NumberFormat('es-ES', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(num);
    }

    /**
     * Formatear moneda
     */
    formatCurrency(amount, currency = 'EUR') {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    /**
     * Formatear fecha relativa (hace X tiempo)
     */
    formatTimeAgo(timestamp) {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + ' años';
        
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + ' meses';
        
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + ' días';
        
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + ' horas';
        
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + ' minutos';
        
        return 'Ahora mismo';
    }

    /**
     * Copiar texto al portapapeles
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showNotification('Copiado al portapapeles', 'success', 2000);
            return true;
        } catch (error) {
            console.error('Error copiando:', error);
            this.showNotification('Error al copiar', 'error', 2000);
            return false;
        }
    }

    /**
     * Validar dirección Ethereum
     */
    isValidEthAddress(address) {
        return /^0x[a-fA-F0-9]{40}$/.test(address);
    }

    /**
     * Truncar dirección Ethereum
     */
    truncateAddress(address, startChars = 6, endChars = 4) {
        if (!address) return '';
        return `${address.substring(0, startChars)}...${address.substring(address.length - endChars)}`;
    }

    /**
     * Actualizar progreso en barra
     */
    updateProgressBar(elementId, percentage) {
        const bar = document.getElementById(elementId);
        if (bar) {
            bar.style.width = `${percentage}%`;
            bar.setAttribute('aria-valuenow', percentage);
        }
    }

    /**
     * Renderizar lista de donaciones
     */
    renderDonationsList(donations, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (donations.length === 0) {
            container.innerHTML = `
                <div class="text-center py-16 text-slate-400">
                    <span class="material-symbols-outlined text-6xl mb-4 opacity-50">inbox</span>
                    <p class="text-lg font-semibold">No hay donaciones aún</p>
                </div>
            `;
            return;
        }

        container.innerHTML = donations.map(donation => `
            <div class="bg-surface-light border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer" 
                 onclick="window.location.href='tracker.html?id=${donation.id}'">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="font-bold text-lg text-slate-900 mb-1">${donation.projectName}</h3>
                        <p class="text-sm text-slate-500">${donation.id}</p>
                    </div>
                    <div class="text-right">
                        <div class="text-2xl font-bold text-primary">${this.formatCurrency(donation.amount)}</div>
                        <div class="text-sm text-slate-500">${donation.amountEth} ETH</div>
                    </div>
                </div>
                <div class="flex items-center justify-between text-sm">
                    <span class="text-slate-500">${this.formatTimeAgo(donation.timestamp)}</span>
                    <span class="px-3 py-1 rounded-full text-xs font-bold ${
                        donation.status === 'completed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                    }">
                        ${donation.status === 'completed' ? 'Completada' : 'En progreso'}
                    </span>
                </div>
            </div>
        `).join('');
    }

    /**
     * Scroll suave a elemento
     */
    scrollToElement(elementId, offset = 0) {
        const element = document.getElementById(elementId);
        if (element) {
            const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }

    /**
     * Obtener parámetros de URL
     */
    getURLParams() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params) {
            result[key] = value;
        }
        return result;
    }

    /**
     * Debounce function para optimizar eventos
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Inicializar UI Manager globalmente
const uiManager = new UIManager();

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => uiManager.init());
} else {
    uiManager.init();
}

// Agregar animaciones CSS al head
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);