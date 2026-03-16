# 🐛 ANÁLISIS DE PROBLEMAS Y SOLUCIONES - FUNDACIÓN 97

**Versión**: 1.0  
**Fecha**: 20 Enero 2026  
**Nivel de Urgencia**: CRÍTICA  

---

## 🔴 PROBLEMAS CRÍTICOS (Bloquean Launch)

### PROBLEMA 1: Smart Contract No Desplegado

**Severidad**: 🔴 CRÍTICA  
**Estado**: ⛔ BLOQUEADOR TOTAL  
**Impacto**: Sin contrato = cero funcionalidad blockchain  

#### Descripción

```javascript
// blockchain.js línea 45
const contractAddress = '0x0000000000000000000000000000000000000000';
```

El contrato no existe en ninguna red. Esto hace que **TODA** donación falle.

#### Root Cause

- No se escribió Solidity contract
- No se deployó a testnet
- No se obtuvo ABI
- No se verificó en explorer

#### Impacto Actual

```
User flow:
  Click "Donar" 
    → Modal abre ✓
    → Selecciona monto ✓
    → Click "Donar Ahora"
      → web3.eth.call() a 0x00000...
        → CONTRACT NOT FOUND ❌
        → showNotification('Error')
        → User confused, leaves
```

#### Solución

**Paso 1**: Escribir `contracts/Fundacion97.sol`
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Fundacion97 is ReentrancyGuard, Ownable {
    
    struct Donation {
        address donor;
        uint256 projectId;
        uint256 amount;
        uint256 timestamp;
        uint256 blockNumber;
    }
    
    mapping(address => uint256[]) public userDonations;
    mapping(uint256 => uint256) public projectRaised;
    Donation[] public allDonations;
    
    event DonationMade(
        address indexed donor,
        uint256 indexed projectId,
        uint256 amount,
        uint256 timestamp
    );
    
    event FundsTransferred(
        uint256 indexed projectId,
        address indexed recipient,
        uint256 amount
    );
    
    // Min 0.001 ETH (~€3), Max 1000 ETH
    uint256 public constant MIN_DONATION = 1e15; // 0.001 ETH
    uint256 public constant MAX_DONATION = 1000e18; // 1000 ETH
    
    receive() external payable {
        revert("Use donate(projectId) function");
    }
    
    function donate(uint256 projectId) external payable nonReentrant {
        require(msg.value >= MIN_DONATION, "Amount too small");
        require(msg.value <= MAX_DONATION, "Amount too large");
        require(projectId >= 1 && projectId <= 6, "Invalid project");
        
        // Record donation
        Donation memory donation = Donation(
            msg.sender,
            projectId,
            msg.value,
            block.timestamp,
            block.number
        );
        allDonations.push(donation);
        userDonations[msg.sender].push(allDonations.length - 1);
        
        // Update project totals
        projectRaised[projectId] += msg.value;
        
        // Emit event
        emit DonationMade(msg.sender, projectId, msg.value, block.timestamp);
        
        // Transfer 97% to project (3% stays in contract for operations)
        uint256 projectAmount = (msg.value * 97) / 100;
        payable(getProjectWallet(projectId)).transfer(projectAmount);
    }
    
    function getDonations(address donor) 
        external 
        view 
        returns (Donation[] memory) 
    {
        uint256[] memory indices = userDonations[donor];
        Donation[] memory donations = new Donation[](indices.length);
        for (uint256 i = 0; i < indices.length; i++) {
            donations[i] = allDonations[indices[i]];
        }
        return donations;
    }
    
    function getDonationDetails(uint256 index)
        external
        view
        returns (Donation memory)
    {
        require(index < allDonations.length, "Invalid index");
        return allDonations[index];
    }
    
    function getProjectWallet(uint256 projectId)
        internal
        pure
        returns (address)
    {
        // Hardcoded project wallets (from proyectos.json)
        if (projectId == 1) return 0x1111111111111111111111111111111111111111; // Guatemala
        if (projectId == 2) return 0x2222222222222222222222222222222222222222; // Kenya
        if (projectId == 3) return 0x3333333333333333333333333333333333333333; // Peru
        if (projectId == 4) return 0x4444444444444444444444444444444444444444; // Brazil
        if (projectId == 5) return 0x5555555555555555555555555555555555555555; // India
        if (projectId == 6) return 0x6666666666666666666666666666666666666666; // Uganda
        revert("Invalid project");
    }
    
    function withdrawOperations(uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance");
        payable(owner()).transfer(amount);
    }
}
```

**Paso 2**: Deploy a Mumbai
```bash
# .env
MUMBAI_RPC=https://rpc-mumbai.maticvigil.com
MUMBAI_PRIVATE_KEY=0x[dev_key]

# Compilar
hardhat compile

# Deploy
hardhat run scripts/deploy.js --network mumbai

# Output:
# Contract deployed to: 0x71C4...F92
```

**Paso 3**: Update `blockchain.js`
```javascript
const CONTRACT_ABI = [
  // Copiado del artifact
  {"type": "function", "name": "donate", ...},
  {"type": "function", "name": "getDonations", ...},
  ...
];

const contractAddress = '0x71C4...F92'; // Mumbai
const mainnetAddress = '0x[TBD]';       // Mainnet (future)
```

**Impacto post-solución**: 
- ✅ Transacciones pasan a blockchain
- ✅ Donaciones guardadas en contract
- ✅ Usuarios ven confirmación
- ✅ Datos verificables en explorer

**Timeline**: 2-3 horas  
**Responsable**: DevOps Lead / Backend Dev  

---

### PROBLEMA 2: BlockchainTracker Methods Incompletas

**Severidad**: 🔴 CRÍTICA  
**Estado**: ⛔ Stubs, no funcionales  
**Impacto**: Donaciones no se registran  

#### Descripción

En [blockchain.js](blockchain.js#L200-L230), los métodos son stubs:

```javascript
// blockchain.js línea 200-210
getDonations(address) {
    // TODO: Implement
    return [];
}

getDonationDetails(transactionHash) {
    // TODO: Implement
    return null;
}
```

#### Root Cause

- Métodos `placeholders`
- Sin llamadas a contract
- Sin parsing de results

#### Impacto

```
User donates:
  1. Transaction entra a mempool ✓
  2. Contrato recibe pago ✓
  3. blockchainTracker.getDonations() llamado
     → Retorna [] (empty)
     → UI muestra: "No donations yet" ❌
     → Usuario cree que donación falló
```

#### Solución

```javascript
// blockchain.js

async getDonations(address) {
    try {
        if (!this.contract) throw new Error('Contract not initialized');
        
        // Llamar método del contrato
        const donations = await this.contract.methods
            .getDonations(address)
            .call();
        
        // Parsear resultados
        return donations.map(d => ({
            id: d.blockNumber + '-' + d.timestamp,
            projectId: parseInt(d.projectId),
            amount: this.web3.utils.fromWei(d.amount, 'ether'),
            amountEth: this.web3.utils.fromWei(d.amount, 'ether'),
            timestamp: parseInt(d.timestamp),
            blockNumber: parseInt(d.blockNumber),
            donor: d.donor,
            status: 'completed'
        }));
    } catch (error) {
        console.error('getDonations error:', error);
        throw error;
    }
}

async getDonationDetails(transactionHash) {
    try {
        // Obtener receipt de la transacción
        const receipt = await this.web3.eth.getTransactionReceipt(transactionHash);
        
        if (!receipt) {
            return {
                status: 'pending',
                confirmations: 0
            };
        }
        
        // Parsear logs
        const eventSignature = this.web3.utils.keccak256(
            'DonationMade(address,uint256,uint256,uint256)'
        );
        
        const logs = receipt.logs.filter(log => 
            log.topics[0] === eventSignature
        );
        
        if (logs.length === 0) {
            return { status: 'failed', error: 'Event not found' };
        }
        
        // Decodificar evento
        const decoded = this.web3.eth.abi.decodeLog(
            [
                { type: 'address', name: 'donor' },
                { type: 'uint256', name: 'projectId' },
                { type: 'uint256', name: 'amount' },
                { type: 'uint256', name: 'timestamp' }
            ],
            logs[0].data,
            logs[0].topics.slice(1)
        );
        
        return {
            id: receipt.blockNumber + '-' + decoded.timestamp,
            projectId: parseInt(decoded.projectId),
            amount: this.web3.utils.fromWei(decoded.amount, 'ether'),
            timestamp: parseInt(decoded.timestamp),
            blockNumber: receipt.blockNumber,
            confirmations: Math.max(0, 
                this.currentBlockNumber - receipt.blockNumber
            ),
            status: receipt.status ? 'completed' : 'failed',
            gasUsed: receipt.gasUsed,
            gasPrice: receipt.gasPrice,
            transactionHash: transactionHash
        };
    } catch (error) {
        console.error('getDonationDetails error:', error);
        throw error;
    }
}

async donate(projectId, amountEth) {
    try {
        if (!this.walletAddress) {
            throw new Error('Wallet not connected');
        }
        
        if (this.chainId !== '0x13881' && this.chainId !== '0x89') {
            throw new Error('Please switch to Polygon network');
        }
        
        // Validaciones
        const amountWei = this.web3.utils.toWei(amountEth.toString(), 'ether');
        if (amountWei < '1000000000000000') { // 0.001 ETH
            throw new Error('Minimum donation: 0.001 ETH (~€3)');
        }
        
        if (amountWei > '1000000000000000000000') { // 1000 ETH
            throw new Error('Maximum donation: 1000 ETH');
        }
        
        // Obtener gas estimate
        const gasEstimate = await this.contract.methods
            .donate(projectId)
            .estimateGas({
                from: this.walletAddress,
                value: amountWei
            });
        
        // Agregar 20% buffer
        const gas = Math.ceil(gasEstimate * 1.2);
        
        // Obtener gas price
        const gasPrice = await this.web3.eth.getGasPrice();
        
        // Crear transacción
        const tx = this.contract.methods.donate(projectId).send({
            from: this.walletAddress,
            value: amountWei,
            gas: gas,
            gasPrice: gasPrice
        });
        
        // Retornar promise
        return new Promise((resolve, reject) => {
            tx.on('transactionHash', (hash) => {
                console.log('Transaction sent:', hash);
                this.lastTransactionHash = hash;
            })
            .on('confirmation', (confirmationNumber, receipt) => {
                console.log(`Confirmation ${confirmationNumber}`);
            })
            .on('error', (error) => {
                console.error('Transaction error:', error);
                reject(error);
            })
            .then(receipt => {
                console.log('Transaction confirmed:', receipt);
                resolve(receipt);
            });
        });
        
    } catch (error) {
        console.error('donate error:', error);
        throw error;
    }
}
```

**Impacto post-solución**:
- ✅ Donaciones se leen desde contrato
- ✅ Histórico muestra transacciones reales
- ✅ Status tracking en tiempo real
- ✅ Detalles completos (gas, confirmaciones)

**Timeline**: 4-5 horas  
**Responsable**: Dev Frontend

---

### PROBLEMA 3: main.js Vacío - Sin Orchestración

**Severidad**: 🔴 CRÍTICA  
**Estado**: ⛔ 0 líneas  
**Impacto**: Módulos no se inicializan, ningún evento funciona  

#### Descripción

```javascript
// main.js - VACÍO
```

#### Root Cause

- No hay punto de entrada centralizado
- Cada módulo se auto-inicializa (mala práctica)
- Sin control de orden de carga
- Sin error handling global

#### Impacto

```
Página carga:
  1. HTML parseado
  2. JS scripts inline ejecutados
  3. ??? Nadie inicializa UIManager
  4. ??? Nadie inicializa BlockchainTracker
  5. ??? Nadie carga proyectos
  6. User hace click → ERROR (módulo no existe)
```

#### Solución

Crear `main.js` como orquestador central:

```javascript
// js/main.js

/**
 * Fundación 97 - Application Orchestrator
 * Point of entry for all initialization
 */

(function() {
    'use strict';
    
    // ============================================
    // STATE
    // ============================================
    
    let appState = {
        initialized: false,
        walletConnected: false,
        currentNetwork: null,
        projects: [],
        userDonations: []
    };
    
    // ============================================
    // INITIALIZATION
    // ============================================
    
    async function initializeApp() {
        try {
            console.log('🚀 Initializing Fundación 97 App...');
            
            // Step 1: Initialize UI Manager
            console.log('  → Initializing UI Manager...');
            window.uiManager = new UIManager();
            
            // Step 2: Initialize Blockchain Tracker
            console.log('  → Initializing Blockchain Tracker...');
            window.blockchainTracker = new BlockchainTracker();
            
            // Step 3: Initialize Donations UI
            console.log('  → Initializing Donations UI...');
            window.donationsUI = new DonationsUI();
            
            // Step 4: Load projects
            console.log('  → Loading projects...');
            appState.projects = await loadProjects();
            
            // Step 5: Setup event listeners
            console.log('  → Setting up event listeners...');
            setupEventListeners();
            
            // Step 6: Restore wallet state if exists
            console.log('  → Restoring wallet state...');
            await restoreWalletState();
            
            // Step 7: Setup blockchain listeners
            console.log('  → Setting up blockchain listeners...');
            setupBlockchainListeners();
            
            appState.initialized = true;
            console.log('✅ App initialized successfully');
            
        } catch (error) {
            console.error('❌ Initialization error:', error);
            window.uiManager?.showNotification(
                'Error initializing app: ' + error.message,
                'error'
            );
            // Don't throw - app can partially work
        }
    }
    
    // ============================================
    // LOADING
    // ============================================
    
    async function loadProjects() {
        try {
            const response = await fetch('data/proyectos.json');
            if (!response.ok) throw new Error('Failed to load projects');
            const data = await response.json();
            return data.proyectos || data;
        } catch (error) {
            console.error('Error loading projects:', error);
            window.uiManager?.showNotification(
                'Error loading projects',
                'error'
            );
            return [];
        }
    }
    
    // ============================================
    // WALLET RESTORATION
    // ============================================
    
    async function restoreWalletState() {
        try {
            const savedWallet = localStorage.getItem('walletAddress');
            const savedNetwork = localStorage.getItem('lastNetwork');
            
            if (savedWallet && window.ethereum) {
                console.log('  ↳ Found saved wallet, connecting...');
                
                // Verify wallet still connected in MetaMask
                const accounts = await window.ethereum.request({
                    method: 'eth_accounts'
                });
                
                if (accounts && accounts.length > 0) {
                    console.log('  ↳ Wallet reconnected automatically');
                    appState.walletConnected = true;
                    
                    // Switch to last used network if needed
                    if (savedNetwork) {
                        try {
                            await window.ethereum.request({
                                method: 'wallet_switchEthereumChain',
                                params: [{ chainId: savedNetwork }]
                            });
                            console.log('  ↳ Network restored to:', savedNetwork);
                        } catch (error) {
                            console.warn('Could not restore network:', error.message);
                        }
                    }
                    
                    // Update UI
                    updateWalletDisplay(accounts[0], savedNetwork);
                    
                    // Load user's donations
                    await loadUserDonations(accounts[0]);
                }
            }
        } catch (error) {
            console.error('Error restoring wallet state:', error);
            // Silent fail - user can connect manually
        }
    }
    
    // ============================================
    // EVENT LISTENERS
    // ============================================
    
    function setupEventListeners() {
        // Wallet connection buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-action="connect-wallet"]')) {
                handleConnectWallet(e);
            }
            if (e.target.matches('[data-action="donate"]')) {
                handleDonate(e);
            }
        });
        
        // Page-specific handlers
        if (document.querySelector('[data-page="dashboard"]')) {
            setupDashboardHandlers();
        }
        if (document.querySelector('[data-page="tracker"]')) {
            setupTrackerHandlers();
        }
    }
    
    function setupDashboardHandlers() {
        // Auto-refresh donations every 30s
        setInterval(async () => {
            if (appState.walletConnected) {
                await loadUserDonations(window.blockchainTracker.walletAddress);
            }
        }, 30000);
    }
    
    function setupTrackerHandlers() {
        // Monitor specific transaction
        const txHash = new URLSearchParams(window.location.search).get('tx');
        if (txHash) {
            monitorTransaction(txHash);
        }
    }
    
    // ============================================
    // BLOCKCHAIN LISTENERS
    // ============================================
    
    function setupBlockchainListeners() {
        if (!window.ethereum) return;
        
        // Account changed
        window.ethereum.on('accountsChanged', (accounts) => {
            console.log('👤 Account changed:', accounts[0]);
            if (accounts.length > 0) {
                appState.walletConnected = true;
                appState.userDonations = [];
                updateWalletDisplay(accounts[0]);
            } else {
                appState.walletConnected = false;
                updateWalletDisplay(null);
            }
        });
        
        // Chain changed
        window.ethereum.on('chainChanged', (chainId) => {
            console.log('🔗 Network changed:', chainId);
            appState.currentNetwork = chainId;
            localStorage.setItem('lastNetwork', chainId);
            
            // Check if valid network
            if (chainId !== '0x13881' && chainId !== '0x89') {
                window.uiManager.showNotification(
                    'Please switch to Polygon network',
                    'warning'
                );
            }
            window.location.reload(); // Reload app
        });
    }
    
    // ============================================
    // HANDLERS
    // ============================================
    
    async function handleConnectWallet(event) {
        event.preventDefault();
        try {
            if (!window.ethereum) {
                throw new Error('MetaMask not installed');
            }
            
            window.uiManager.showLoading('Connecting wallet...');
            
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            
            if (accounts.length > 0) {
                appState.walletConnected = true;
                const address = accounts[0];
                
                localStorage.setItem('walletAddress', address);
                updateWalletDisplay(address);
                
                window.uiManager.showNotification(
                    'Wallet connected: ' + window.blockchainTracker.truncateAddress(address),
                    'success'
                );
                
                await loadUserDonations(address);
            }
            
            window.uiManager.hideLoading();
        } catch (error) {
            console.error('Wallet connection error:', error);
            window.uiManager.showNotification(
                error.message,
                'error'
            );
        }
    }
    
    async function handleDonate(event) {
        event.preventDefault();
        
        if (!appState.walletConnected) {
            window.uiManager.showNotification(
                'Please connect your wallet first',
                'warning'
            );
            return;
        }
        
        // Abrir modal de donación
        window.donationsUI.openModal();
    }
    
    async function loadUserDonations(address) {
        try {
            const donations = await window.blockchainTracker.getDonations(address);
            appState.userDonations = donations;
            
            // Actualizar UI (si existe)
            const donationsList = document.querySelector('[data-donations-list]');
            if (donationsList) {
                updateDonationsList(donations);
            }
        } catch (error) {
            console.error('Error loading donations:', error);
        }
    }
    
    async function monitorTransaction(txHash) {
        try {
            let confirmations = 0;
            const maxWait = 5 * 60 * 1000; // 5 minutes
            const startTime = Date.now();
            
            const interval = setInterval(async () => {
                try {
                    const details = await window.blockchainTracker.getDonationDetails(txHash);
                    
                    // Update UI
                    updateTransactionStatus(details);
                    
                    // Stop polling after 12 confirmations
                    if (details.confirmations >= 12) {
                        clearInterval(interval);
                        window.uiManager.showNotification(
                            'Transaction confirmed!',
                            'success'
                        );
                    }
                    
                    // Timeout after 5 minutes
                    if (Date.now() - startTime > maxWait) {
                        clearInterval(interval);
                    }
                } catch (error) {
                    console.error('Error checking transaction:', error);
                }
            }, 5000); // Check every 5 seconds
            
        } catch (error) {
            console.error('Error monitoring transaction:', error);
        }
    }
    
    // ============================================
    // UI UPDATES
    // ============================================
    
    function updateWalletDisplay(address, network) {
        // Update all wallet display elements
        const walletElements = document.querySelectorAll('[data-wallet-address]');
        walletElements.forEach(el => {
            el.textContent = address 
                ? window.blockchainTracker.truncateAddress(address)
                : 'Connect Wallet';
        });
        
        // Update network display
        if (network) {
            const networkName = network === '0x13881' ? 'Mumbai' : 
                               network === '0x89' ? 'Mainnet' : 'Unknown';
            const networkElements = document.querySelectorAll('[data-network]');
            networkElements.forEach(el => {
                el.textContent = networkName;
                el.className = el.className.replace(/network-\w+/g, '') + ' network-' + networkName.toLowerCase();
            });
        }
    }
    
    function updateDonationsList(donations) {
        const list = document.querySelector('[data-donations-list]');
        if (!list) return;
        
        if (donations.length === 0) {
            list.innerHTML = '<p class="text-gray-500">No donations yet</p>';
            return;
        }
        
        list.innerHTML = donations.map(d => `
            <div class="donation-card">
                <h4>${d.projectId}</h4>
                <p>${d.amount} ETH</p>
                <p class="text-sm text-gray-500">${new Date(d.timestamp * 1000).toLocaleDateString()}</p>
            </div>
        `).join('');
    }
    
    function updateTransactionStatus(details) {
        const statusEl = document.querySelector('[data-tx-status]');
        if (!statusEl) return;
        
        statusEl.innerHTML = `
            <div class="tx-status ${details.status}">
                <p>Status: <strong>${details.status}</strong></p>
                <p>Confirmations: <strong>${details.confirmations}</strong></p>
                <p>Gas Used: <strong>${details.gasUsed}</strong></p>
            </div>
        `;
    }
    
    // ============================================
    // STARTUP
    // ============================================
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
    
    // Global error handler
    window.addEventListener('error', (event) => {
        console.error('Uncaught error:', event.error);
        if (window.uiManager) {
            window.uiManager.showNotification(
                'Unexpected error: ' + event.error.message,
                'error'
            );
        }
    });
    
    // Unhandled promise rejection
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled rejection:', event.reason);
        if (window.uiManager) {
            window.uiManager.showNotification(
                'Error: ' + event.reason,
                'error'
            );
        }
    });
    
})();
```

**Impacto post-solución**:
- ✅ Inicialización clara y ordenada
- ✅ Error handling global
- ✅ Wallet restoration automática
- ✅ State management centralizado
- ✅ Debugging más fácil

**Timeline**: 3-4 horas  
**Responsable**: Dev Frontend  

---

## 🟠 PROBLEMAS IMPORTANTES (Degradan Funcionalidad)

### PROBLEMA 4: No hay Persistencia de Datos

**Severidad**: 🟠 IMPORTANTE  
**Estado**: ⚠️ Donaciones se pierden al refresh  

#### Solución Rápida

```javascript
// En main.js - agregarle persistencia

async function loadUserDonations(address) {
    try {
        // Intentar cargar del cache primero
        const cached = localStorage.getItem('donations_' + address);
        if (cached) {
            appState.userDonations = JSON.parse(cached);
            updateDonationsList(appState.userDonations);
        }
        
        // Luego cargar del blockchain
        const donations = await window.blockchainTracker.getDonations(address);
        appState.userDonations = donations;
        
        // Guardar en cache
        localStorage.setItem('donations_' + address, JSON.stringify(donations));
        
        updateDonationsList(donations);
    } catch (error) {
        console.error('Error loading donations:', error);
    }
}
```

**Timeline**: 1-2 horas  
**Responsable**: Dev Frontend  

---

### PROBLEMA 5: Validación de Input Débil

**Severidad**: 🟠 IMPORTANTE  
**Estado**: ⚠️ Posible XSS  

#### Solución

```javascript
// En donations.js

function validateAmount(value) {
    const num = parseFloat(value);
    
    if (isNaN(num)) return { valid: false, error: 'Invalid amount' };
    if (num <= 0) return { valid: false, error: 'Amount must be > 0' };
    if (num > 1000) return { valid: false, error: 'Max 1000 ETH' };
    if (num < 0.001) return { valid: false, error: 'Min 0.001 ETH (~€3)' };
    
    // Check decimals
    const decimals = (num.toString().split('.')[1] || '').length;
    if (decimals > 18) return { valid: false, error: 'Too many decimals' };
    
    return { valid: true, value: num };
}

// Sanitize HTML input
function sanitizeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text; // No innerHTML - prevents XSS
    return div.innerHTML;
}
```

**Timeline**: 2 horas  
**Responsable**: Dev Frontend  

---

### PROBLEMA 6: Archivos Vacíos (main.js, web3.js, donar.html)

**Severidad**: 🟠 IMPORTANTE  
**Estado**: ⚠️ Confusión / Mantenimiento difícil  

#### Solución

```
// Opción 1: Completar
- main.js → Ya completado arriba
- web3.js → Eliminar (código en blockchain.js)
- donar.html → Ver Fase 2 de roadmap

// Opción 2: Inmediato
rm web3.js  # Eliminar archivo duplicado
```

**Timeline**: 30 min  
**Responsable**: Dev Frontend  

---

## 🟡 PROBLEMAS MENORES (UX/Performance)

### PROBLEMA 7: Lazy Loading de Imágenes

```html
<!-- ANTES -->
<img src="projects/1.jpg" alt="Guatemala">

<!-- DESPUÉS -->
<img src="projects/1.jpg" alt="Guatemala" loading="lazy">
```

**Timeline**: 1h

---

### PROBLEMA 8: Sin Fallback Intl API

```javascript
// ANTES
const formatted = new Intl.NumberFormat('es-ES').format(value);

// DESPUÉS  
function formatCurrency(amount, currency = 'EUR') {
    try {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: currency
        }).format(amount);
    } catch (e) {
        // Fallback para navegadores viejos
        return amount.toFixed(2) + ' ' + currency;
    }
}
```

**Timeline**: 1h

---

## 📊 RESUMEN DE PROBLEMAS

| # | Problema | Severidad | Blocker | Timeline | Responsable |
|----|----------|-----------|---------|----------|------------|
| 1 | Smart Contract no deployado | 🔴 | SÍ | 2-3h | DevOps |
| 2 | BlockchainTracker incompleto | 🔴 | SÍ | 4-5h | Frontend |
| 3 | main.js vacío | 🔴 | SÍ | 3-4h | Frontend |
| 4 | Sin persistencia | 🟠 | NO | 1-2h | Frontend |
| 5 | Input validation débil | 🟠 | NO | 2h | Frontend |
| 6 | Archivos vacíos | 🟠 | NO | 30m | Frontend |
| 7 | Sin lazy loading | 🟡 | NO | 1h | Frontend |
| 8 | Sin Intl fallback | 🟡 | NO | 1h | Frontend |

**Total críticos**: 10-12 horas = Semana 1 completable  
**Total importantes**: 5-6 horas = Semana 1-2  
**Total menores**: 2 horas = Cuando sea  

---

**Documento Crítico**: Resolver problemas 1-3 antes de cualquier testing  
**Próxima revisión**: Post-solución de Problema 1
