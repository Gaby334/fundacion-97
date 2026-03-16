# 🏗️ DOCUMENTACIÓN TÉCNICA - ARQUITECTURA FUNDACIÓN 97

**Versión**: 1.0  
**Fecha**: 20 Enero 2026  
**Audience**: Desarrolladores, Architects

---

## 📐 ARQUITECTURA DE SISTEMA

### 1. Diagrama de Componentes

```
┌───────────────────────────────────────────────────────────────┐
│                         USUARIO                              │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
    ┌───▼─────┐  ┌───────▼────────┐  ┌──▼──────────┐
    │ Browser │  │  MetaMask UI   │  │   Wallet   │
    │ Chrome/ │  │  (Extensión)   │  │ (Conectada)│
    │ Firefox │  └────────────────┘  └─────┬──────┘
    └────┬────┘                            │
         │                                  │
    ┌────▼──────────────────────────────────▼──────────────┐
    │         DOM & Event Handling                         │
    │  ┌─────────────────────────────────────────────────┐ │
    │  │  HTML: 5 páginas estáticas + dinámicas         │ │
    │  │  CSS: Tailwind v3 + custom animations          │ │
    │  │  JS: Vanilla (3 módulos)                       │ │
    │  └─────────────────────────────────────────────────┘ │
    └────┬──────────────────────────────────────────────────┘
         │
    ┌────▼─────────────────────────────────────────────┐
    │           Application Layer (JS Modules)         │
    │  ┌─────────────┐  ┌─────────────────────────┐   │
    │  │  UIManager  │  │   DonationsUI + Modals │   │
    │  │ (ui.js)     │  │   (donations.js)       │   │
    │  ├─────────────┤  ├─────────────────────────┤   │
    │  │ Dark Mode   │  │ Donation Form           │   │
    │  │ Notifications│  │ Amount Calculator      │   │
    │  │ Modals      │  │ Wallet Connection      │   │
    │  │ Formatting  │  │ Transaction Processing │   │
    │  └─────────────┘  └─────────────────────────┘   │
    │                                                  │
    │  ┌──────────────────────────────┐               │
    │  │  BlockchainTracker           │               │
    │  │  (blockchain.js)             │               │
    │  ├──────────────────────────────┤               │
    │  │ Web3 Initialization          │               │
    │  │ Wallet Connection            │               │
    │  │ Transaction Management       │               │
    │  │ Network Switching            │               │
    │  │ Contract Interaction         │               │
    │  └──────────────────────────────┘               │
    └────┬─────────────────────────────────────────────┘
         │
    ┌────▼─────────────────────────────────────────────┐
    │            Web3 & Blockchain Layer               │
    │  ┌─────────────┐  ┌───────────┐  ┌────────────┐ │
    │  │  Web3.js    │  │  window   │  │  MetaMask  │ │
    │  │ Instance    │  │.ethereum  │  │  Provider  │ │
    │  └─────────────┘  └───────────┘  └────────────┘ │
    └────┬─────────────────────────────────────────────┘
         │
    ┌────▼─────────────────────────────────────────────┐
    │            RPC & Network Layer                    │
    │  ┌─────────────────────────────────────────────┐ │
    │  │  Polygon Mainnet (0x89)                    │ │
    │  │  RPC: https://polygon-rpc.com             │ │
    │  │                                             │ │
    │  │  Polygon Mumbai Testnet (0x13881)         │ │
    │  │  RPC: https://rpc-mumbai.maticvigil.com  │ │
    │  └─────────────────────────────────────────────┘ │
    └────┬─────────────────────────────────────────────┘
         │
    ┌────▼─────────────────────────────────────────────┐
    │          Smart Contract Layer                     │
    │  ┌─────────────────────────────────────────────┐ │
    │  │  Fundacion97.sol (TO BE DEPLOYED)          │ │
    │  │                                             │ │
    │  │  Functions:                                 │ │
    │  │  - donate(projectId)                       │ │
    │  │  - getDonations(address)                   │ │
    │  │  - getDonationDetails(id)                  │ │
    │  │  - claimFunds(projectId)                   │ │
    │  │  - updateProjectGoal(id, newGoal)          │ │
    │  │                                             │ │
    │  │  Events:                                    │ │
    │  │  - DonationMade                            │ │
    │  │  - FundsTransferred                        │ │
    │  │  - ProjectUpdated                          │ │
    │  └─────────────────────────────────────────────┘ │
    └────┬─────────────────────────────────────────────┘
         │
    ┌────▼─────────────────────────────────────────────┐
    │           Blockchain State & Events              │
    │  - Transactions inmutables                        │
    │  - Event logs verificables                       │
    │  - State tree de proyectos                       │
    └─────────────────────────────────────────────────┘
```

---

## 🔄 FLUJO DE DATOS DETALLADO

### Flujo 1: Inicialización de Página

```
document.load
    │
    ├─→ index.html parsed
    │   ├─ Tailwind CSS loaded (CDN)
    │   ├─ Web3.js loaded (CDN)
    │   └─ Material Symbols loaded
    │
    ├─→ Scripts inline ejecutados
    │   ├─ Tailwind config
    │   └─ Event listeners
    │
    ├─→ ui.js loaded
    │   └─ UIManager instantiated
    │       ├─ Dark mode setup
    │       ├─ Mobile menu setup
    │       ├─ Smooth scroll setup
    │       ├─ Animations setup
    │       └─ Listeners attached
    │
    ├─→ blockchain.js loaded
    │   └─ BlockchainTracker instantiated
    │       ├─ Networks config loaded
    │       ├─ Contract ABI set
    │       └─ Ready for init()
    │
    ├─→ donations.js loaded
    │   └─ DonationsUI instantiated
    │       ├─ Modal HTML created
    │       └─ Event listeners attached
    │
    └─→ proyectos.json loaded (async)
        ├─ Parsed
        ├─ In-memory storage
        └─ renderProjects() called
            └─ Grid generated
```

### Flujo 2: Conexión de Wallet

```
User clicks "Connect Wallet"
    │
    ├─→ Event handler triggered
    │   └─ blockchainTracker.connectWallet()
    │
    ├─→ MetaMask popup shown
    │   └─ User reviews permissions
    │
    ├─→ User approves
    │   │
    │   ├─→ window.ethereum.request({
    │   │     method: 'eth_requestAccounts'
    │   │   })
    │   │
    │   └─→ Response received
    │       ├─ accounts[0] extracted
    │       ├─ chainId obtained
    │       └─ Listeners configured
    │
    ├─→ State updated in UIManager
    │   ├─ walletInfo.address = accounts[0]
    │   ├─ walletInfo.network = chainId
    │   └─ UI updated
    │
    └─→ Callback triggered
        └─ onWalletConnected()
            └─ UI buttons enabled
```

### Flujo 3: Realizar Donación (Completo)

```
START: User opens project
    │
    ├─→ projectCard clicked
    │   └─ data-project-id = "1"
    │
    ├─→ [Donar] button handler
    │   └─ donationsUI.openModal(project)
    │
    ├─→ Modal visible
    │   ├─ Project title mostrado
    │   ├─ Input fields focused
    │   └─ Events listeners ready
    │
    ├─ User Input Phase
    │   │
    │   ├─→ Ingresa monto: "100"
    │   │   ├─ onInput triggered
    │   │   ├─ updateBreakdown() executed
    │   │   │   ├─ projectAmount = 97€
    │   │   │   ├─ platformAmount = 3€
    │   │   │   ├─ ethEquivalent = 0.0303 ETH
    │   │   │   └─ UI updated
    │   │   └─ validAmount = true
    │   │
    │   └─→ Selecciona moneda: "EUR"
    │       └─ updateBreakdown() re-executed
    │
    ├─ Validation Phase
    │   │
    │   ├─→ Check: amount > 0 ✅
    │   ├─→ Check: wallet connected ✅
    │   ├─→ Check: network = mumbai ✅
    │   └─→ Check: gas available ✅
    │
    ├─→ [Donar Ahora] button enabled
    │   └─ onClick handler ready
    │
    ├─ Transaction Phase
    │   │
    │   ├─→ User clicks [Donar Ahora]
    │   │   └─ processDonation() triggered
    │   │
    │   ├─→ uiManager.showLoading()
    │   │   └─ Loading spinner shown
    │   │
    │   ├─→ blockchainTracker.donate()
    │   │   ├─ Datos preparados:
    │   │   │   ├─ projectId = 1
    │   │   │   ├─ amountEth = 0.0303
    │   │   │   ├─ from = accounts[0]
    │   │   │   └─ gas = 200000
    │   │   │
    │   │   ├─→ web3.utils.toWei() conversion
    │   │   │   └─ amountWei = 30300000000000000
    │   │   │
    │   │   ├─→ buildTransaction()
    │   │   │   └─ tx object created
    │   │   │
    │   │   └─→ window.ethereum.sendTransaction(tx)
    │   │
    │   ├─→ MetaMask popup shown
    │   │   ├─ From: 0x71C4...F92
    │   │   ├─ To: 0x71C7...2A8 (contract)
    │   │   ├─ Value: 0.0303 ETH (~€100)
    │   │   ├─ Gas: 200000 (est. €XX)
    │   │   └─ User reviews and signs
    │   │
    │   ├─→ User approves in MetaMask
    │   │   └─ Transaction signed
    │   │
    │   ├─→ Transaction sent to network
    │   │   │
    │   │   ├─ Status: "pending"
    │   │   │   └─ UI: "Enviando..."
    │   │   │
    │   │   ├─ Network processes
    │   │   │   ├─ Validation
    │   │   │   ├─ Mempool
    │   │   │   └─ Mining
    │   │   │
    │   │   ├─ Status: "confirmed"
    │   │   │   ├─ Block included
    │   │   │   ├─ Confirmations++
    │   │   │   └─ Receipt obtained
    │   │   │
    │   │   └─ transactionHash = "0x8a...4b"
    │
    ├─ Success Phase
    │   │
    │   ├─→ uiManager.hideLoading()
    │   │   └─ Spinner hidden
    │   │
    │   ├─→ uiManager.showNotification('Éxito', 'success')
    │   │   ├─ Toast shown
    │   │   └─ Auto-dismiss after 3s
    │   │
    │   ├─→ Donation recorded:
    │   │   ├─ localStorage.setItem('donation_' + txHash)
    │   │   │   ├─ projectId
    │   │   │   ├─ amount
    │   │   │   ├─ timestamp
    │   │   │   └─ status: 'completed'
    │   │   │
    │   │   └─ Update UI:
    │   │       ├─ Project progress bar ++
    │   │       ├─ Donor count ++
    │   │       └─ Recent donations list updated
    │   │
    │   ├─→ Modal closed
    │   │   └─ Form reset
    │   │
    │   └─→ Redirect to tracker.html?id=<txHash>
    │       └─ Mostrar detalles de donación
    │
    └─ END: User sees confirmation

ERROR Path (if something fails):
    │
    ├─→ Error caught in try-catch
    │   ├─ error.message logged
    │   └─ error type determined
    │
    ├─→ User facing error message:
    │   ├─ "Fondos insuficientes" (low balance)
    │   ├─ "Red incorrecta" (wrong network)
    │   ├─ "Usuario canceló" (user rejected)
    │   └─ "Error en transacción" (network error)
    │
    ├─→ uiManager.showNotification(errorMsg, 'error')
    │   └─ Error toast shown
    │
    ├─→ uiManager.hideLoading()
    │   └─ Spinner removed
    │
    └─→ User can retry or cancel
```

---

## 🗄️ DATA STRUCTURES

### LocalStorage Schema

```javascript
// Donaciones del usuario
localStorage.getItem('donations')
{
  "donations": [
    {
      "id": "0x8a...4b12",
      "projectId": 1,
      "projectName": "Agua Potable - Guatemala",
      "amount": 100,
      "currency": "EUR",
      "amountEth": "0.0303",
      "timestamp": 1705745400,
      "status": "completed|pending|failed",
      "blockNumber": 12345678,
      "confirmations": 128,
      "gasPaid": "0.00123"
    }
  ]
}

// Preferencias de usuario
localStorage.getItem('preferences')
{
  "darkMode": true,
  "language": "es",
  "notification": true,
  "walletAddress": "0x71C4...F92",
  "lastNetwork": "0x13881",
  "theme": "dark"
}

// Cache de proyectos
localStorage.getItem('projects_cache')
{
  "timestamp": 1705745400,
  "version": 2,
  "data": [/* 6 proyectos */]
}
```

### Contract State Variables (Solidity)

```solidity
mapping(address => uint256[]) public userDonations;
mapping(uint256 => uint256) public projectRaised;
mapping(uint256 => uint256) public projectGoal;
mapping(uint256 => address payable) public projectWallet;
mapping(uint256 => Project) public projects;

struct Project {
  uint256 id;
  string title;
  uint256 goal;
  uint256 raised;
  address payable wallet;
  bool verified;
  uint256 createdAt;
}

struct Donation {
  address donor;
  uint256 projectId;
  uint256 amount;
  uint256 timestamp;
  string status;
}
```

---

## 🔐 SEGURIDAD

### Smart Contract Security Measures

```solidity
// 1. Reentrancy Protection
- nonReentrant modifier
- Checks-Effects-Interactions pattern

// 2. Overflow/Underflow Prevention
- SafeMath library (or ^0.8.0 built-in)
- require() guards

// 3. Access Control
- onlyOwner() for admin functions
- Verified addresses for projects

// 4. Rate Limiting
- Min donation amount: 0.001 ETH
- Max per transaction: 1000 ETH

// 5. Pause Mechanism
- Emergency stop for vulnerabilities
- Owner can pause donations

// 6. Fund Safety
- Auto-lock funds for 7 days
- Multi-sig wallet for withdrawals
- Time-lock for high-value transfers
```

### Frontend Security

```javascript
// 1. Input Validation
- Amount > 0
- Address validation (regex)
- XSS prevention (no innerHTML with user input)

// 2. Storage Security
- Sensitive data not in localStorage
- Passwords never stored
- LocalStorage used only for non-critical data

// 3. API Security
- CORS configured
- Rate limiting
- Authentication tokens (future)

// 4. Network Security
- HTTPS enforced
- CSP headers
- X-Frame-Options: DENY

// 5. Wallet Security
- Never request private key
- Use window.ethereum only
- Confirm transactions with user
```

---

## 📱 RESPONSIVE DESIGN

### Breakpoints Tailwind

```
Mobile First Approach:
├─ Default: < 640px (mobile)
├─ sm: 640px (small devices)
├─ md: 768px (tablets)
├─ lg: 1024px (small desktop)
├─ xl: 1280px (desktop)
└─ 2xl: 1536px (large desktop)

Media Queries Used:
├─ hidden md:flex (show on desktop)
├─ grid-cols-1 md:grid-cols-2 lg:grid-cols-3
├─ text-sm md:text-base lg:text-lg
├─ px-4 md:px-6 lg:px-8
└─ w-full md:w-1/2 lg:w-1/3
```

### Dark Mode Implementation

```javascript
// Tailwind Strategy: "class"
html.classList.toggle('dark')

// CSS Applied
html.dark .card {
  background-color: var(--surface-dark);
}

// Preference Detection
window.matchMedia('(prefers-color-scheme: dark)')

// Persistence
localStorage.setItem('darkMode', boolean)
```

---

## 🔧 ENVIRONMENTAL CONFIGURATION

### development.env
```
NETWORK_ID=0x13881          # Mumbai Testnet
CONTRACT_ADDRESS=0x...      # Mumbai deployed
RPC_URL=https://rpc-mumbai.maticvigil.com
EXPLORER=https://mumbai.polygonscan.com
LOG_LEVEL=debug
API_TIMEOUT=30000
```

### production.env
```
NETWORK_ID=0x89             # Polygon Mainnet
CONTRACT_ADDRESS=0x...      # Mainnet deployed
RPC_URL=https://polygon-rpc.com
EXPLORER=https://polygonscan.com
LOG_LEVEL=warn
API_TIMEOUT=10000
ENABLE_ANALYTICS=true
```

---

## 🧪 TESTING STRATEGY

### Unit Tests (Jest)

```javascript
// ui.js
test('formatCurrency should format EUR correctly')
test('truncateAddress should truncate properly')
test('debounce should delay execution')

// blockchain.js
test('connectWallet should return valid address')
test('donate should handle insufficient funds')
test('switchToMumbai should add network if missing')

// donations.js
test('updateBreakdown should calculate 97/3')
test('setAmount should update input value')
test('processDonation should show loading state')
```

### Integration Tests (Cypress)

```javascript
// Full donation flow
describe('Donation Flow', () => {
  test('User can donate successfully')
  test('Modal validates amount > 0')
  test('Transaction status updates in real-time')
  test('Error toast shows on failure')
})

// Network switching
describe('Network Management', () => {
  test('Can switch from mainnet to testnet')
  test('Incorrect network shows warning')
  test('Auto-switch on startup if saved')
})
```

---

## 📊 PERFORMANCE METRICS

### Target Metrics

```
Lighthouse:
├─ Performance: 90+
├─ Accessibility: 95+
├─ Best Practices: 95+
└─ SEO: 100

Page Load:
├─ First Contentful Paint: < 1.5s
├─ Largest Contentful Paint: < 2.5s
├─ Time to Interactive: < 3.5s
├─ Cumulative Layout Shift: < 0.1
└─ Total Blocking Time: < 300ms

Transaction:
├─ Gas used: < 200,000
├─ Avg fee: < 2 MATIC
├─ Confirmation time: < 60s
└─ Success rate: > 98%
```

---

## 🚀 DEPLOYMENT

### Frontend Deployment (Vercel)

```bash
push to main branch
  ↓
GitHub webhook triggered
  ↓
Vercel builds project
  ├─ npm run build
  ├─ Tailwind compilation
  └─ Asset optimization
  ↓
Tests run (if configured)
  ↓
Deploy to edge network
  ├─ HTTPS enabled
  ├─ CDN cached
  └─ Auto-scaling
  ↓
Production live
```

### Smart Contract Deployment

```bash
Network: Mumbai Testnet → Mainnet

1. Mumbai (Testing)
   - Deploy contract
   - Run test suite
   - Security audit
   - Get feedback

2. Mainnet (Production)
   - Transfer ABI to frontend
   - Update contract address
   - Enable production mode
   - Monitor gas prices
```

---

**Documento Técnico Generado**: 20 Enero 2026  
**Audience**: Development Team  
**Versión**: 1.0
