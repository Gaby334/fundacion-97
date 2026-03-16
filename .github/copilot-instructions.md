# Fundación 97 - AI Agent Instructions

## Project Overview

**Fundación 97** is a blockchain-based transparent donation platform ensuring 97% of funds reach projects, with 3% covering operations. The tech stack is vanilla HTML/CSS/JavaScript (no frameworks) with Web3.js for blockchain interaction and smart contracts on Polygon network.

**Key Principle**: This is a pure frontend application with blockchain integration—no backend server. All logic flows through three decoupled JavaScript modules and MetaMask for wallet connectivity.

---

## Architecture & Component Boundaries

### Four Core Modules (Vanilla JS Classes)

1. **`js/navigation.js` - NavigationManager** *(NEW)*
   - Centralizes navigation across all pages
   - Detects current page automatically
   - Generates correct relative paths for all links
   - Manages top navigation bar (all pages) and sidebar (app pages)
   - Handles mobile menu with auto-close on navigation
   - **Key methods**: `init()`, `detectCurrentPage()`, `getRelativePath()`, `updateWalletStatus()`
   - **Critical**: Must be loaded FIRST before other JS modules

2. **`js/ui.js` - UIManager**
   - Manages dark mode, mobile menu, smooth scrolling, animations
   - Single source of truth for UI state
   - No blockchain logic here—purely presentation layer
   - Example: `UIManager.toggleDarkMode()` toggles the `dark` class on `<html>`

3. **`js/blockchain.js` - BlockchainTracker**
   - Web3.js initialization and wallet connection
   - Network management (supports Polygon Mainnet `0x89` and Mumbai Testnet `0x13881`)
   - Smart contract ABI and interaction (address: `0xB5Dca6eA553C7751eAaE60A58d2F7acD1C25f4E9`)
   - Does NOT handle UI updates—it only manages state and returns promises
   - Must call `init()` before use to set up `window.ethereum` listeners

4. **`js/donations.js` - DonationsUI**
   - Modal creation and donation form management
   - Bridges UIManager and BlockchainTracker
   - Calls `blockchainTracker.donate()` to execute transactions
   - Handles amount validation, currency conversion, fee breakdown (97/3 split)

### Data Flow Pattern

```
User Action → Navigation (consistent) → Event Listener → DonationsUI → BlockchainTracker → Web3.js → MetaMask → Polygon RPC
                                                              ↓
                                                       UIManager (notifications/modals)
```

**Critical**: NavigationManager runs first to ensure consistent navigation. Script loading order:
1. `navigation.js` (initializes navigation)
2. `blockchain.js` (initializes Web3)
3. `donations.js` (sets up donation UI)
4. `ui.js` (handles general UI)

---

## Key Technical Patterns

### 1. Navigation Page Detection

NavigationManager automatically detects the current page:
```javascript
detectCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('dashboard.html')) return 'dashboard';
    if (path.includes('tracker.html')) return 'tracker';
    if (path.includes('proyectos.html')) return 'projects';
    return 'home';
}
```

### 2. Smart Relative Paths

Links are generated correctly regardless of current page:
```javascript
// From home: 'pages/dashboard.html'
// From dashboard: 'tracker.html'
// From tracker: 'dashboard.html'
const path = navigationManager.getRelativePath('tracker');
```

### 3. Mobile Menu Auto-Close

Menu closes automatically when:
- User clicks a link
- User clicks outside menu
- Navigation to new page
```javascript
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});
```

### 4. Active Page Highlighting

Current page is visually highlighted:
```javascript
syncActiveLinks() {
    if (this.currentPage === 'dashboard') {
        dashboardLink.classList.add('bg-primary/10', 'text-primary');
    }
}
```

### 5. Async/Await for Blockchain Operations

All wallet and contract calls are async. Use try-catch for error handling:

```javascript
try {
    await blockchainTracker.connectWallet();
} catch (error) {
    if (error.code === 4001) {
        // User rejected
    }
}
```

Networks are defined in `BlockchainTracker.networks` object. When adding a new network:
- Add entry with `chainId` (hex string), `name`, `rpcUrl`, `explorer`
- Update contract ABI if new network requires different functions
- Test with `BlockchainTracker.switchNetwork(chainId)`

### 6. Network Switching Configuration

Networks are defined in `BlockchainTracker.networks` object. When adding a new network:
- Add entry with `chainId` (hex string), `name`, `rpcUrl`, `explorer`
- Update contract ABI if new network requires different functions
- Test with `BlockchainTracker.switchNetwork(chainId)`

### 7. Smart Contract Interaction

- Contract ABI is simplified and stored in `BlockchainTracker.contractABI` (not a separate file)
- Only deployed functions are included
- Contract address: `0xB5Dca6eA553C7751eAaE60A58d2F7acD1C25f4E9` (update when redeployed)
- All functions return promises; no synchronous blockchain calls

### 8. DOM Selectors & Data Attributes

Use data attributes for component identification (never classes for logic):
- `[data-project-id]` - project identifier
- `[data-mobile-menu]` - mobile navigation
- `[data-mobile-menu-button]` - menu trigger
- Example: `document.querySelector('[data-project-id="1"]')`

### 9. Modal Pattern

DonationsUI creates modals dynamically via `createDonationModal()`. Modal state:
- Hidden by default (add `hidden` class to toggle)
- Closes with `donationsUI.closeModal()`
- Opens with `donationsUI.openModal(project)` which hydrates `currentProject`

---

## Static Data & Configuration

### Projects Data (`data/proyectos.json`)

- Single source of truth for project list
- Loaded async on page init
- Structure: `[{id, name, description, goal, current, category, ...}]`
- No updates pushed to blockchain until smart contract deployed
- **Convention**: Always validate `projectId` matches a JSON entry before blockchain calls

### Brand Configuration (`BRANDBOOK_COLORS.md`)

Color palette is predefined; use Tailwind color utility names from `index.html` tailwind config:
- Primary: `#2E86AB` (trust-blue)
- Secondary: `#F8B27A` (soft-orange)
- Only use CSS utilities, never hardcode hex values

---

## Development Workflow

### Local Testing Without Deployment

1. Open `index.html` directly in browser (file:// protocol)
2. MetaMask must be installed; connect to Mumbai Testnet
3. No build process—all changes take effect on reload
4. Console logs indicate initialization: `✅ UIManager inicializado`, etc.

### Modifying Blockchain Integration

- Update ABI in `BlockchainTracker.contractABI` if contract interface changes
- Test with `BlockchainTracker.getContractInstance()` before calling functions
- Always emit events on transaction completion for audit trail

### Adding New Pages

- Create `.html` file in `pages/` directory
- Include all three JS modules at bottom: `<script src="../js/ui.js"></script>` etc.
- Initialize in inline `<script>`: `new UIManager().init(); new BlockchainTracker().init();`
- Do NOT use external bundlers or npm—vanilla approach only

---

## Common Integration Points & Gotchas

### MetaMask Dependency

- Must be installed in browser; gracefully handle if `window.ethereum` is undefined
- Always await `connectWallet()` before any contract call
- MetaMask can switch networks mid-session—BlockchainTracker listens for `chainChanged` events

### Currency Conversion

DonationsUI includes EUR→ETH/MATIC conversion. Rates are hardcoded; when updating:
- Modify `conversionRates` object in `donations.js`
- Recalculate fee split (97% project, 3% platform)
- Show breakdown in modal before submission

### Error Handling Convention

UI errors should use `UIManager.showNotification()` (if implemented). Blockchain errors:
- Log to console
- Show user-friendly message in modal
- Never expose raw web3 errors to end-user

---

## Documentation References

- **Architecture Deep Dive**: [docs/arquitectura/ARQUITECTURA_TECNICA.md](../docs/arquitectura/ARQUITECTURA_TECNICA.md) (covers data flows, transaction sequences)
- **Quick Start**: [docs/guias/QUICK_START_DEV.md](../docs/guias/QUICK_START_DEV.md) (5-min onboarding)
- **Brand Guidelines**: [fundacion-97/BRANDBOOK_COLORS.md](../fundacion-97/BRANDBOOK_COLORS.md)

---

## Debugging Tips

1. **Check Module Initialization**: Open DevTools → type `window.uiManager`, `window.blockchainTracker`, `window.donationsUI` to verify instances exist
2. **Watch Blockchain State**: Use `window.blockchainTracker.account`, `window.blockchainTracker.networkId` to inspect connected wallet
3. **Trace Transaction**: All contract calls emit console logs with transaction hash; track via [Polygonscan](https://polygonscan.com) or [Mumbai Explorer](https://mumbai.polygonscan.com)

