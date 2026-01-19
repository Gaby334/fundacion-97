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
            <div id="donationModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm hidden z-50 flex items-center justify-center p-4">
                <div class="bg-gradient-to-br from-slate-900 to-purple-900 border border-white/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <!-- Header -->
                    <div class="p-6 border-b border-white/10">
                        <div class="flex justify-between items-start">
                            <div>
                                <h2 class="text-2xl font-bold mb-2">Realizar Donación</h2>
                                <p class="text-gray-400" id="modalProjectName">Proyecto</p>
                            </div>
                            <button onclick="donationsUI.closeModal()" class="text-gray-400 hover:text-white transition">
                                <i class="fas fa-times text-2xl"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Body -->
                    <div class="p-6 space-y-6">
                        <!-- Amount Input -->
                        <div>
                            <label class="block text-sm font-semibold mb-2">Cantidad a donar</label>
                            <div class="flex gap-3">
                                <div class="flex-1 relative">
                                    <input 
                                        type="number" 
                                        id="donationAmount" 
                                        placeholder="100"
                                        min="1"
                                        class="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-blue-500"
                                    >
                                    <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">€</span>
                                </div>
                                <select id="currencySelect" class="bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500">
                                    <option value="eur">EUR</option>
                                    <option value="eth">ETH</option>
                                    <option value="matic">MATIC</option>
                                </select>
                            </div>
                            <p class="text-sm text-gray-400 mt-2">Equivalente: <span id="equivalentAmount">~0.00 ETH</span></p>
                        </div>

                        <!-- Quick amounts -->
                        <div>
                            <label class="block text-sm font-semibold mb-2">Cantidad sugerida</label>
                            <div class="grid grid-cols-4 gap-2">
                                <button onclick="donationsUI.setAmount(25)" class="bg-white/10 hover:bg-white/20 py-2 rounded-lg transition">25€</button>
                                <button onclick="donationsUI.setAmount(50)" class="bg-white/10 hover:bg-white/20 py-2 rounded-lg transition">50€</button>
                                <button onclick="donationsUI.setAmount(100)" class="bg-white/10 hover:bg-white/20 py-2 rounded-lg transition">100€</button>
                                <button onclick="donationsUI.setAmount(250)" class="bg-white/10 hover:bg-white/20 py-2 rounded-lg transition">250€</button>
                            </div>
                        </div>

                        <!-- Distribution breakdown -->
                        <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                            <h3 class="font-semibold mb-3 flex items-center">
                                <i class="fas fa-chart-pie text-blue-400 mr-2"></i>
                                Distribución de tu donación
                            </h3>
                            <div class="space-y-2">
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-400">Al proyecto (97%)</span>
                                    <span class="font-bold text-green-400" id="projectAmount">0 €</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-400">Costes de plataforma (3%)</span>
                                    <span class="font-bold" id="platformAmount">0 €</span>
                                </div>
                                <div class="w-full bg-gray-700 rounded-full h-2 mt-3">
                                    <div class="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style="width: 97%"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Wallet status -->
                        <div id="walletStatus" class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <i class="fas fa-wallet text-yellow-400 text-xl mr-3"></i>
                                    <div>
                                        <div class="font-semibold">Wallet no conectada</div>
                                        <div class="text-sm text-gray-400">Conecta tu wallet para continuar</div>
                                    </div>
                                </div>
                                <button onclick="donationsUI.connectWallet()" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition">
                                    Conectar
                                </button>
                            </div>
                        </div>

                        <!-- Blockchain info -->
                        <div class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                            <h3 class="font-semibold mb-2 flex items-center">
                                <i class="fas fa-cube text-purple-400 mr-2"></i>
                                Verificación Blockchain
                            </h3>
                            <p class="text-sm text-gray-400">
                                Tu donación será registrada en Polygon blockchain. 
                                Recibirás un recibo de seguimiento único e inmutable.
                            </p>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="p-6 border-t border-white/10 flex gap-3">
                        <button onclick="donationsUI.closeModal()" class="flex-1 bg-white/10 hover:bg-white/20 py-3 rounded-lg font-semibold transition">
                            Cancelar
                        </button>
                        <button id="confirmDonationBtn" onclick="donationsUI.processDonation()" class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                            <i class="fas fa-heart mr-2"></i>
                            Donar Ahora
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
        this.currentProject = project;
        document.getElementById('modalProjectName').textContent = project.title;
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
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
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Procesando...';
        btn.disabled = true;
        
        try {
            // Convertir EUR a ETH (simulado)
            const ethAmount = amount / 3300;
            
            // Realizar donación
            const result = await this.tracker.donate(this.currentProject.id, ethAmount);
            
            this.showNotification('¡Donación exitosa!', 'success');
            this.closeModal();
            
            // Redirigir a dashboard con el hash
            setTimeout(() => {
                window.location.href = `dashboard.html?tx=${result.txHash}`;
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