# ⚡ QUICK START GUIDE - DEV TEAM

**Última actualización**: 20 Enero 2026  
**Para**: Developers que empiezan hoy  
**Tiempo de lectura**: 10 minutos  

---

## 🎯 TL;DR

**Estado**: 60% hecho, 40% por hacer  
**Blocker**: Smart contract no existe  
**Timeline**: 14 semanas  
**Presupuesto**: €100K  
**Equipo**: 3 devs  

**Acción hoy**: Setup environments

---

## 🔴 3 TAREAS CRÍTICAS (Semana 1)

### Tarea 1: Write Smart Contract (~8 horas)

**Archivo**: `contracts/Fundacion97.sol`  
**Responsable**: Backend Dev  

```solidity
// Copy-paste este template
pragma solidity ^0.8.0;

contract Fundacion97 {
    // Funciones necesarias:
    // - donate(projectId) payable
    // - getDonations(address) returns (Donation[])
    // - getDonationDetails(id) returns (Donation)
    
    // Emitir eventos:
    // - DonationMade(donor, projectId, amount, timestamp)
    // - FundsTransferred(projectId, recipient, amount)
}
```

**Referencia**: Ver [PROBLEMAS_Y_SOLUCIONES.md#PROBLEMA-1](PROBLEMAS_Y_SOLUCIONES.md#problema-1)

---

### Tarea 2: Deploy a Mumbai (~2 horas)

**Red**: Polygon Mumbai Testnet (0x13881)  b
**Responsable**: DevOps/Backend Dev  

```bash
# 1. Compilar
hardhat compile

# 2. Deploy
npx hardhat run scripts/deploy.js --network mumbai

# 3. Obtener address
# Output: "Contract deployed to: 0x[ADDRESS]"

# 4. Guardar en blockchain.js
# const contractAddress = '0x[ADDRESS]';
```

**Documentación**: [ARQUITECTURA_TECNICA.md#Deployment](ARQUITECTURA_TECNICA.md)

---

### Tarea 3: Complete BlockchainTracker (~4-5 horas)

**Archivo**: `js/blockchain.js`  
**Responsable**: Frontend Dev  
**Líneas**: ~150-210  

```javascript
// Implementar 3 métodos que están vacíos:

// 1. getDonations(address) 
//    - Llamar contract.methods.getDonations()
//    - Retornar array de donaciones

// 2. getDonationDetails(txHash)
//    - Obtener receipt
//    - Parsear logs
//    - Retornar detalles

// 3. donate(projectId, amountEth)
//    - Reemplazar stub
//    - Validar inputs
//    - Enviar transacción
```

**Referencia**: [PROBLEMAS_Y_SOLUCIONES.md#PROBLEMA-2](PROBLEMAS_Y_SOLUCIONES.md#problema-2)

---

## 🟠 1 TAREA ADICIONAL (Semana 1)

### Tarea 4: Create main.js (~3-4 horas)

**Archivo**: `js/main.js` (ACTUALMENTE VACÍO)  
**Responsable**: Frontend Dev  

```javascript
// Point of entry para la aplicación

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Inicializar UIManager
    window.uiManager = new UIManager();
    
    // 2. Inicializar BlockchainTracker
    window.blockchainTracker = new BlockchainTracker();
    
    // 3. Inicializar DonationsUI
    window.donationsUI = new DonationsUI();
    
    // 4. Cargar proyectos
    // 5. Restaurar wallet si existe
    // 6. Setup listeners
});
```

**Referencia**: [PROBLEMAS_Y_SOLUCIONES.md#PROBLEMA-3](PROBLEMAS_Y_SOLUCIONES.md#problema-3)

---

## ✅ FASE 1 COMPLETADA CUANDO

- [ ] Smart contract deployado en Mumbai
- [ ] Dirección del contrato: `0x...` guardada en blockchain.js
- [ ] Primera donación completada sin errores
- [ ] Transacción visible en [mumbai.polygonscan.com](https://mumbai.polygonscan.com)
- [ ] Histórico de donaciones funciona
- [ ] Wallet reconecta automáticamente
- [ ] Status: "ALPHA TESTNET" ✅

---

## 📚 DOCUMENTACIÓN CLAVE

| Documento | Tiempo | Contenido |
|-----------|--------|----------|
| [RESUMEN_EJECUTIVO.md](RESUMEN_EJECUTIVO.md) | 20 min | Overview completo |
| [DOCUMENTO_MAESTRO.md](DOCUMENTO_MAESTRO.md) | 40 min | Análisis técnico profundo |
| [PROBLEMAS_Y_SOLUCIONES.md](PROBLEMAS_Y_SOLUCIONES.md) | 35 min | Soluciones código |
| [ARQUITECTURA_TECNICA.md](ARQUITECTURA_TECNICA.md) | 30 min | Diagramas y flujos |
| [CHECKLIST_IMPLEMENTACION.md](CHECKLIST_IMPLEMENTACION.md) | 25 min | Plan de 14 semanas |

---

## 🛠️ SETUP ENVIRONMENT

### 1. Testnet Setup (10 min)

```bash
# 1. Obtener testnet ETH
# Ir a: https://faucet.polygon.technology/
# Copiar tu address y recibir testnet MATIC

# 2. Agregar network a MetaMask
Network: Polygon Mumbai
RPC: https://rpc-mumbai.maticvigil.com
ChainID: 80001 (o 0x13881 hex)

# 3. Switch a Mumbai en MetaMask
# (Dropdown top-left)
```

### 2. Project Setup (5 min)

```bash
# Clone o ya está en repositorio
cd e:\master\TFM\Web\fundacion-97

# Abrir en VS Code
code .

# Ver estructura
fundacion-97/
├─ index.html
├─ js/
│  ├─ ui.js (✅ Hecho)
│  ├─ blockchain.js (⚠️ Incompleto)
│  ├─ donations.js (✅ Hecho)
│  └─ main.js (❌ Vacío)
├─ data/
│  └─ proyectos.json (✅ 6 proyectos)
└─ contracts/
   └─ (TBD: Solidity contract)
```

### 3. Hardhat Setup (si no existe)

```bash
# 1. Instalar Hardhat
npm install --save-dev hardhat

# 2. Inicializar
npx hardhat

# 3. Configurar network (hardhat.config.js)
networks: {
    mumbai: {
        url: 'https://rpc-mumbai.maticvigil.com',
        accounts: [PRIVATE_KEY]  // De .env
    }
}
```

---

## 🧪 TESTING CHECKLIST

### Antes de Semana 2 (Código Review)

- [ ] Smart contract compila sin errores
- [ ] `hardhat compile` ✅
- [ ] Deploy a Mumbai sin errores
- [ ] `npx hardhat run scripts/deploy.js --network mumbai` ✅
- [ ] Obtener contract address
- [ ] Actualizar en `blockchain.js`

### Semana 2 (Functional Testing)

- [ ] Conectar wallet en Mumbai ✅
- [ ] Seleccionar proyecto ✅
- [ ] Ingresar monto (ej: 0.1 MATIC) ✅
- [ ] Click "Donar" ✅
- [ ] MetaMask popup aparece ✅
- [ ] Aceptar transacción ✅
- [ ] Ver confirmación ✅
- [ ] Verificar en [mumbai.polygonscan.com](https://mumbai.polygonscan.com) ✅

### Fin Semana 2 (Acceptance)

- [ ] 5+ transacciones de prueba completadas
- [ ] 100% success rate
- [ ] Histórico muestra todas
- [ ] Wallet reconecta automáticamente
- [ ] No hay errores en console
- [ ] Status: READY FOR PHASE 2

---

## 🎓 CONCEPTOS RÁPIDOS

### Smart Contract
```
= Programa en blockchain que:
  - Recibe dinero
  - Lo guarda
  - Lo verifica
  - Lo transfiere
  - Es INMUTABLE (no se puede cambiar)
```

### Transacción
```
= Instructión que:
  - User firma con su private key
  - Se envía a la red
  - Mineros/validators procesan
  - Se graba en blockchain
  - Es IRREVERSIBLE
```

### Gas
```
= Costo computacional de una transacción
  - Pago en MATIC
  - Varía según complejidad
  - En testnet: GRATIS (o muy barato)
  - En mainnet: Importante optimizar
```

### ABI
```
= "Manual de instrucciones" del smart contract
  - JSON que describe funciones
  - Necesario para web3.js
  - Se obtiene al compilar
```

---

## 🚨 ERRORES COMUNES

### Error 1: "0x0000... is not a valid contract"
```
❌ Problema: contractAddress no válido o mal copiado
✅ Solución: 
   1. Obtener dirección nueva del deploy
   2. Copiar completamente (incluyendo 0x)
   3. Guardar en blockchain.js
```

### Error 2: "User rejected transaction"
```
❌ Problema: Usuario rechazó en MetaMask
✅ Solución:
   1. Normal - usuario tiene derecho
   2. Mostrar error amigable
   3. Permitir reintentar
```

### Error 3: "Insufficient funds"
```
❌ Problema: No hay suficiente MATIC para gas
✅ Solución:
   1. Ir a faucet: https://faucet.polygon.technology/
   2. Recibir testnet MATIC
   3. Reintentar donación
```

### Error 4: "Wrong network"
```
❌ Problema: User está en Mainnet en vez de Mumbai
✅ Solución:
   1. Mostrar notification: "Switch to Polygon Mumbai"
   2. Botón para switchear automáticamente
   3. Verificar contractAddress existe en esa red
```

---

## 📊 RECURSOS

### Necesarios
- [ ] Polygon Testnet faucet: https://faucet.polygon.technology/
- [ ] Mumbai explorer: https://mumbai.polygonscan.com
- [ ] Solidity docs: https://docs.soliditylang.org
- [ ] Web3.js docs: https://web3js.readthedocs.io
- [ ] Hardhat docs: https://hardhat.org

### Opcionales
- [ ] OpenZeppelin contracts: https://docs.openzeppelin.com/contracts/4.x
- [ ] Remix IDE: https://remix.ethereum.org
- [ ] MetaMask docs: https://docs.metamask.io

---

## 👥 EQUIPO & CONTACTO

### Organigrama

```
Founder
├─ Tech Lead
│  ├─ Backend Dev (Smart Contract + main.js)
│  ├─ Frontend Dev (BlockchainTracker completion)
│  └─ DevOps (Deployment)
└─ Product Manager (tracking)
```

### Canales de Comunicación

- 📅 **Daily Standup**: 10:00 AM (15 min)
- 📋 **Weekly Sync**: Lunes 10:00 AM (30 min)
- 🚨 **Blockers**: Inmediato (Slack/Email)
- 📊 **Phase Reviews**: Fin de fase (1h)

---

## ⏰ TIMELINE REALISTA

```
HOY (20 Jan):
├─ 🟢 Leer documentación (2h)
├─ 🟢 Setup ambientes (1h)
└─ 🟢 Kick-off meeting (30min)
   → Total: 3.5 horas

ESTA SEMANA (21-25 Jan):
├─ 🟡 Escribir smart contract (8h)
├─ 🟡 Deploy a testnet (2h)
├─ 🟡 Completar BlockchainTracker (4-5h)
├─ 🟡 Crear main.js (3-4h)
├─ 🟡 Testing & debugging (3-4h)
└─ 🟡 Code review (2h)
   → Total: 25-27 horas (~3-4 days)

PRÓXIMA SEMANA (28 Jan - 1 Feb):
├─ 🔵 Testing profundo (8h)
├─ 🔵 Fixes y mejoras (4h)
└─ 🔵 Phase 1 COMPLETADA
   → Status: "ALPHA TESTNET" ✅
```

---

## ✨ BONUS: ACELERAR FASE 1

### Si necesitas ir más rápido...

#### Usar Template Existente
```
En vez de escribir contrato desde cero:
→ Usar OpenZeppelin ContractKit
→ Solo customizar para 97/3 split
→ -4 horas de desarrollo
```

#### Paralelizar Tasks
```
Mientras Backend hace smart contract:
→ Frontend completa BlockchainTracker
→ DevOps setups Mumbai + Mainnet networks
→ QA prepara test cases
→ -50% tiempo total
```

#### Usar Audit Service Rápido
```
En vez de audit manual:
→ Usar OpenZeppelin Defender API
→ Scan automático de vulnerabilidades
→ -2 semanas en Fase 5
→ +€2K costo
```

---

## 🎉 ÉXITO = CÓMO SABERLO

### Fin Semana 1 ✅
```
□ Smart contract en Mumbai: 0x[ADDRESS]
□ Primera donación: 0.1 MATIC enviado
□ Transacción en explorer: Confirmada
□ Status: GREEN LIGHT ✅
```

### Fin Semana 2 ✅
```
□ 5+ donaciones de prueba
□ 100% success rate
□ Histórico funcionando
□ Wallet auto-reconnect
□ Phase 1: COMPLETADA 🎉
```

---

## 🚀 PRÓXIMO PASO

1. **Ahora** (20 min): Lee este doc
2. **Hoy** (1h): Ejecuta setup environment
3. **Mañana** (8h): Start tarea 1 (smart contract)
4. **Esta semana** (25h): Complete tareas 1-4
5. **Próxima semana** (8h): Testing exhaustivo

---

**Quick Start creado**: 20 Enero 2026  
**Actualización**: Diaria durante Fase 1  
**Próxima revisión**: 27 Enero 2026

🚀 **¡A PROGRAMAR!**

---

## 📌 COSAS QUE NO OLVIDAR

```
✅ Leer RESUMEN_EJECUTIVO.md primero
✅ Setup Mumbai testnet
✅ Obtener testnet MATIC
✅ Smart contract es BLOCKER crítico
✅ Una transacción exitosa = Phase 1 done
✅ Comunicar blockers inmediatamente
✅ Testing = Parte del desarrollo
✅ Documentar cambios en código
```

---

**Última línea**: Good luck! 💪
