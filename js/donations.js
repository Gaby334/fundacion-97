/**
 * FUNDACIÓN 97 - Sistema de UI para Donaciones
 * Módulo para gestionar la interfaz de usuario de donaciones
 * Versión: 1.0.0
 */

class DonationsUI {
    constructor(blockchainTracker) {
        this.tracker = blockchainTracker;
        this.modal = null;
        this.currentProject = null;
    }

    /**
     * Inicializar sistema de donaciones
     */
    init() {
        this.createDonationModal();
        this.attachEventListeners();
        console.log('✅ DonationsUI inicializado');
    }

    /**
     * Crear modal de donación
     */
    createDonationModal() {
        const modalHTML = `
            <div id="donationModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm hidden z-50 flex items-center justify-center p-4 transition-opacity duration-300">
                <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-700">
                    <!-- Header -->
                    <div class="p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-primary to-primary-dark rounded-t-2xl">
                        <div class="flex justify-between items-start">
                            <div>
                                <h2 class="text-2xl font-bold text-white mb-1">Donar Ahora</h2>
                                <p class="text-white/80 text-sm" id="modalProjectName">Fundación 97</p>
                            </div>
                            <button onclick="donationsUI.closeModal()" class="text-white/60 hover:text-white transition text-2xl leading-none">
                                ✕
                            </button>
                        </div>
                    </div>

                    <!-- Body -->
                    <div class="p-6 space-y-5">
                        <!-- Amount Input -->
                        <div>
                            <label class="block text-sm font-bold text-slate-900 dark:text-white mb-2">Cantidad a donar</label>
                            <div class="flex gap-2">
                                <div class="flex-1 relative">
                                    <input 
                                        type="number" 
                                        id="donationAmount" 
                                        placeholder="100"
                                        min="1"
                                        class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white text-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    >
                                    <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-bold">€</span>
                                </div>
                                <select id="currencySelect" class="px-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-primary transition-all">
                                    <option value="eur">EUR</option>
                                    <option value="eth">ETH</option>
                                    <option value="matic">MATIC</option>
                                </select>
                            </div>
                            <p class="text-xs text-slate-600 dark:text-slate-400 mt-2">Equivalente: <span id="equivalentAmount" class="font-semibold text-primary">~0.00 ETH</span></p>
                        </div>

                        <!-- Quick amounts -->
                        <div>
                            <label class="block text-sm font-bold text-slate-900 dark:text-white mb-2">Cantidades sugeridas</label>
                            <div class="grid grid-cols-4 gap-2">
                                <button onclick="donationsUI.setAmount(25)" class="bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 dark:hover:bg-primary/20 text-slate-900 dark:text-white py-2 rounded-lg font-semibold text-sm transition">25€</button>
                                <button onclick="donationsUI.setAmount(50)" class="bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 dark:hover:bg-primary/20 text-slate-900 dark:text-white py-2 rounded-lg font-semibold text-sm transition">50€</button>
                                <button onclick="donationsUI.setAmount(100)" class="bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 dark:hover:bg-primary/20 text-slate-900 dark:text-white py-2 rounded-lg font-semibold text-sm transition">100€</button>
                                <button onclick="donationsUI.setAmount(250)" class="bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 dark:hover:bg-primary/20 text-slate-900 dark:text-white py-2 rounded-lg font-semibold text-sm transition">250€</button>
                            </div>
                        </div>

                        <!-- Distribution breakdown -->
                        <div class="bg-accent/10 dark:bg-accent/5 border border-accent/30 rounded-lg p-4">
                            <h3 class="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center">
                                <span class="material-symbols-outlined text-lg text-accent mr-2">pie_chart</span>
                                Distribución
                            </h3>
                            <div class="space-y-2">
                                <div class="flex justify-between items-center text-sm">
                                    <span class="text-slate-700 dark:text-slate-300">Al proyecto (97%)</span>
                                    <span class="font-bold text-primary" id="projectAmount">0 €</span>
                                </div>
                                <div class="flex justify-between items-center text-sm">
                                    <span class="text-slate-700 dark:text-slate-300">Operación (3%)</span>
                                    <span class="font-bold text-slate-900 dark:text-slate-100" id="platformAmount">0 €</span>
                                </div>
                                <div class="w-full bg-slate-300 dark:bg-slate-600 rounded-full h-2 mt-2">
                                    <div class="bg-gradient-to-r from-accent to-primary h-2 rounded-full" style="width: 97%;"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Wallet status -->
                        <div id="walletStatus" class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700/50 rounded-lg p-4">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <span class="material-symbols-outlined text-yellow-600 dark:text-yellow-500">account_balance_wallet</span>
                                    <div>
                                        <div class="font-semibold text-slate-900 dark:text-white text-sm">Wallet no conectada</div>
                                        <div class="text-xs text-slate-600 dark:text-slate-400">Conecta tu wallet para continuar</div>
                                    </div>
                                </div>
                                <button onclick="donationsUI.connectWallet()" class="bg-primary hover:bg-primary-dark text-white px-3 py-1.5 rounded-lg font-semibold text-sm transition shrink-0">
                                    Conectar
                                </button>
                            </div>
                        </div>

                        <!-- Blockchain info -->
                        <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700/50 rounded-lg p-4">
                            <h3 class="font-bold text-sm text-slate-900 dark:text-white mb-1 flex items-center">
                                <span class="material-symbols-outlined text-lg text-primary mr-2">shield_verified</span>
                                Verificado en Blockchain
                            </h3>
                            <p class="text-xs text-slate-700 dark:text-slate-300">
                                Tu donación será registrada en Polygon de forma verificable e inmutable.
                            </p>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="p-6 border-t border-slate-200 dark:border-slate-700 flex gap-3 bg-slate-50 dark:bg-slate-800/50 rounded-b-2xl">
                        <button onclick="donationsUI.closeModal()" class="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white py-3 rounded-lg font-semibold transition text-sm">
                            Cancelar
                        </button>
                        <button id="confirmDonationBtn" onclick="donationsUI.processDonation()" class="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2" disabled>
                            <span class="material-symbols-outlined">favorite</span>
                            Donar
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('donationModal');
    }

    /**
     * Abrir modal de donación
     */
    openModal(project) {
        // Si no hay proyecto, mostrar el texto por defecto "Fundación 97"
        if (project) {
            this.currentProject = project;
            document.getElementById('modalProjectName').textContent = project.title || project.name || 'Fundación 97';
        } else {
            this.currentProject = null;
            document.getElementById('modalProjectName').textContent = 'Fundación 97';
        }
        
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Hacer visible el modal con transición
        setTimeout(() => {
            this.modal.style.opacity = '1';
        }, 10);
    }

    /**
     * Cerrar modal
     */
    closeModal() {
        this.modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        this.resetForm();
    }

    /**
     * Establecer cantidad predefinida
     */
    setAmount(amount) {
        document.getElementById('donationAmount').value = amount;
        this.updateBreakdown();
    }

    /**
     * Actualizar desglose de distribución
     */
    updateBreakdown() {
        const amount = parseFloat(document.getElementById('donationAmount').value) || 0;
        const toProject = (amount * 0.97).toFixed(2);
        const toPlatform = (amount * 0.03).toFixed(2);
        
        document.getElementById('projectAmount').textContent = `${toProject} €`;
        document.getElementById('platformAmount').textContent = `${toPlatform} €`;
        
        // Actualizar equivalente en ETH (precio simulado: 1 ETH = 3300 EUR)
        const ethEquivalent = (amount / 3300).toFixed(4);
        document.getElementById('equivalentAmount').textContent = `~${ethEquivalent} ETH`;
    }

    /**
     * Conectar wallet desde el modal
     */
    async connectWallet() {
        try {
            const walletInfo = await this.tracker.connectWallet();
            
            document.getElementById('walletStatus').innerHTML = `
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <i class="fas fa-check-circle text-green-400 text-xl mr-3"></i>
                        <div>
                            <div class="font-semibold">Wallet Conectada</div>
                            <div class="text-sm text-gray-400 font-mono">${this.tracker.formatAddress(walletInfo.address)}</div>
                        </div>
                    </div>
                    <div class="bg-green-500/20 px-3 py-1 rounded-full text-sm">
                        Conectada
                    </div>
                </div>
            `;
            
            document.getElementById('confirmDonationBtn').disabled = false;
            
            this.showNotification('Wallet conectada exitosamente', 'success');
            
        } catch (error) {
            this.showNotification('Error conectando wallet', 'error');
            console.error(error);
        }
    }

    /**
     * Procesar donación
     */
    async processDonation() {
        const amount = parseFloat(document.getElementById('donationAmount').value);
        
        if (!amount || amount <= 0) {
            this.showNotification('Por favor ingresa una cantidad válida', 'warning');
            return;
        }
        
        if (!this.tracker.account) {
            this.showNotification('Por favor conecta tu wallet', 'warning');
            return;
        }
        
        // Mostrar loader
        const btn = document.getElementById('confirmDonationBtn');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<span class="material-symbols-outlined animate-spin">hourglass_empty</span>Procesando...';
        btn.disabled = true;
        
        try {
            // Convertir EUR a ETH (simulado)
            const ethAmount = amount / 3300;
            
            // Si hay proyecto, donar a ese proyecto, si no, es una donación general
            const projectId = this.currentProject?.id || 0;
            
            // Realizar donación
            const result = await this.tracker.donate(projectId, ethAmount);
            
            this.showNotification('¡Donación exitosa! Gracias por tu apoyo 💜', 'success');
            this.closeModal();
            
            // Redirigir a dashboard con el hash después de 2 segundos
            setTimeout(() => {
                const redirectUrl = this.currentProject 
                    ? `pages/dashboard.html?tx=${result.txHash}&project=${projectId}`
                    : `pages/dashboard.html?tx=${result.txHash}`;
                window.location.href = redirectUrl;
            }, 2000);
            
        } catch (error) {
            this.showNotification('Error procesando donación: ' + error.message, 'error');
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        }
    }

    /**
     * Resetear formulario
     */
    resetForm() {
        document.getElementById('donationAmount').value = '';
        document.getElementById('projectAmount').textContent = '0 €';
        document.getElementById('platformAmount').textContent = '0 €';
        document.getElementById('equivalentAmount').textContent = '~0.00 ETH';
    }

    /**
     * Mostrar notificación
     */
    showNotification(message, type = 'info') {
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500'
        };
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        
        const notification = document.createElement('div');
        notification.className = `fixed top-6 right-6 ${colors[type]} text-white px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center space-x-3 animate-slide-in`;
        notification.innerHTML = `
            <i class="fas ${icons[type]} text-xl"></i>
            <span class="font-semibold">${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('opacity-0', 'transition-opacity');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    /**
     * Adjuntar event listeners
     */
    attachEventListeners() {
        // Actualizar breakdown cuando cambia el monto
        const amountInput = document.getElementById('donationAmount');
        if (amountInput) {
            amountInput.addEventListener('input', () => this.updateBreakdown());
        }
        
        // Cerrar modal con tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
                this.closeModal();
            }
        });
        
        // Cerrar modal al hacer clic fuera
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }

    /**
     * Renderizar historial de donaciones
     */
    async renderDonationHistory(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        try {
            const donations = await this.tracker.getUserDonations();
            
            if (donations.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-12 text-gray-400">
                        <i class="fas fa-heart-broken text-6xl mb-4 opacity-50"></i>
                        <p class="text-lg">No has realizado donaciones aún</p>
                    </div>
                `;
                return;
            }
            
            container.innerHTML = donations.map(donation => `
                <div class="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition cursor-pointer" onclick="window.location.href='dashboard.html?id=${donation.id}'">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="font-bold text-lg mb-1">${donation.projectName}</h3>
                            <p class="text-sm text-gray-400">${donation.id}</p>
                        </div>
                        <div class="text-right">
                            <div class="text-2xl font-bold text-blue-400">${donation.amount} €</div>
                            <div class="text-sm text-gray-400">${donation.amountEth} ETH</div>
                        </div>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                        <span class="text-gray-400">${this.tracker.formatTimestamp(donation.timestamp)}</span>
                        <span class="bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                            ${donation.status === 'completed' ? 'Completada' : 'En progreso'}
                        </span>
                    </div>
                </div>
            `).join('');
            
        } catch (error) {
            console.error('Error renderizando historial:', error);
        }
    }
}

// Hacer disponible globalmente
let donationsUI;