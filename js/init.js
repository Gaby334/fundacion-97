/**
 * FUNDACIÓN 97 - Inicialización Global
 * Módulo para inicializar BlockchainTracker y DonationsUI en todas las páginas
 * Agrega un botón flotante "Donar" accesible desde cualquier lugar
 * 
 * Debe incluirse ANTES de blockchain.js y donations.js en todas las páginas
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar BlockchainTracker y DonationsUI globalmente
    if (typeof BlockchainTracker !== 'undefined' && typeof DonationsUI !== 'undefined') {
        // Crear instancia global de BlockchainTracker
        if (!window.blockchainTracker) {
            window.blockchainTracker = new BlockchainTracker();
            window.blockchainTracker.init();
        }
        
        // Crear instancia global de DonationsUI
        if (!window.donationsUI) {
            window.donationsUI = new DonationsUI(window.blockchainTracker);
            window.donationsUI.init();
        }
        
        // Crear botón flotante "Donar" si no existe
        if (!document.getElementById('floatingDonateBtn')) {
            createFloatingDonateButton();
        }
    }
});

/**
 * Crear botón flotante "Donar" con animaciones
 */
function createFloatingDonateButton() {
    const floatingButtonHTML = `
        <button id="floatingDonateBtn" class="fixed bottom-6 right-6 z-40 group" title="Donar Ahora">
            <!-- Glow background -->
            <div class="absolute inset-0 rounded-full bg-primary opacity-75 blur-2xl group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <!-- Main button -->
            <div class="relative bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary-dark text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex items-center justify-center">
                <span class="material-symbols-outlined text-2xl">favorite</span>
            </div>
            
            <!-- Floating animation -->
            <style>
                #floatingDonateBtn {
                    animation: float 4s ease-in-out infinite;
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
            </style>
        </button>
    `;
    
    document.body.insertAdjacentHTML('beforeend', floatingButtonHTML);
    
    // Agregar event listener
    const floatingBtn = document.getElementById('floatingDonateBtn');
    floatingBtn.addEventListener('click', () => {
        if (window.donationsUI) {
            // Abrir modal sin proyecto específico (donación general)
            window.donationsUI.openModal(null);
        }
    });
    
    // Mostrar tooltip en hover
    floatingBtn.addEventListener('mouseenter', () => {
        floatingBtn.style.transform = 'scale(1.1)';
    });
    
    floatingBtn.addEventListener('mouseleave', () => {
        floatingBtn.style.transform = 'scale(1)';
    });
}

console.log('✅ Init.js: Sistema de donaciones global inicializado');
