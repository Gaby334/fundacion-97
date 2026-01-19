/**
 * FUNDACIÓN 97 - Sistema de Tracking Blockchain
 * Módulo para gestionar donaciones y trazabilidad en blockchain
 * Versión: 1.0.0
 */

class BlockchainTracker {
    constructor() {
        this.web3 = null;
        this.account = null;
        this.contract = null;
        this.networkId = null;
        
        // Configuración de redes
        this.networks = {
            polygon: {
                chainId: '0x89',
                name: 'Polygon Mainnet',
                rpcUrl: 'https://polygon-rpc.com',
                explorer: 'https://polygonscan.com'
            },
            mumbai: {
                chainId: '0x13881',
                name: 'Polygon Mumbai Testnet',
                rpcUrl: 'https://rpc-mumbai.maticvigil.com',
                explorer: 'https://mumbai.polygonscan.com'
            }
        };
        
        // ABI simplificado del Smart Contract (placeholder)
        this.contractABI = [
            {
                "inputs": [
                    {"internalType": "uint256", "name": "_projectId", "type": "uint256"}
                ],
                "name": "donate",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {"internalType": "address", "name": "_donor", "type": "address"}
                ],
                "name": "getDonations",
                "outputs": [
                    {"internalType": "uint256[]", "name": "", "type": "uint256[]"}
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {"internalType": "uint256", "name": "_donationId", "type": "uint256"}
                ],
                "name": "getDonationDetails",
                "outputs": [
                    {"internalType": "uint256", "name": "amount", "type": "uint256"},
                    {"internalType": "uint256", "name": "projectId", "type": "uint256"},
                    {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
                    {"internalType": "string", "name": "status", "type": "string"}
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];
        
        // Dirección del contrato (actualizar cuando se despliegue)
        this.contractAddress = '0x0000000000000000000000000000000000000000';
    }

    /**
     * Inicializar conexión con MetaMask
     */
    async init() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                this.web3 = new Web3(window.ethereum);
                console.log('✅ Web3 inicializado correctamente');
                return true;
            } catch (error) {
                console.error('❌ Error inicializando Web3:', error);
                return false;
            }
        } else {
            console.warn('⚠️ MetaMask no detectado');
            this.showMetaMaskAlert();
            return false;
        }
    }

    /**
     * Conectar wallet del usuario
     */
    async connectWallet() {
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            
            this.account = accounts[0];
            this.networkId = await this.web3.eth.getChainId();
            
            console.log('✅ Wallet conectada:', this.account);
            console.log('🌐 Red:', this.networkId);
            
            // Escuchar cambios de cuenta
            window.ethereum.on('accountsChanged', (accounts) => {
                this.account = accounts[0];
                this.onAccountChanged(accounts[0]);
            });
            
            // Escuchar cambios de red
            window.ethereum.on('chainChanged', (chainId) => {
                window.location.reload();
            });
            
            return {
                address: this.account,
                network: this.networkId
            };
            
        } catch (error) {
            console.error('❌ Error conectando wallet:', error);
            throw error;
        }
    }

    /**
     * Cambiar a red Polygon Mumbai (testnet)
     */
    async switchToMumbai() {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: this.networks.mumbai.chainId }],
            });
        } catch (switchError) {
            // Si la red no existe, la agregamos
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: this.networks.mumbai.chainId,
                            chainName: this.networks.mumbai.name,
                            rpcUrls: [this.networks.mumbai.rpcUrl],
                            nativeCurrency: {
                                name: 'MATIC',
                                symbol: 'MATIC',
                                decimals: 18
                            },
                            blockExplorerUrls: [this.networks.mumbai.explorer]
                        }]
                    });
                } catch (addError) {
                    console.error('❌ Error agregando red:', addError);
                }
            }
        }
    }

    /**
     * Realizar una donación
     */
    async donate(projectId, amountEth) {
        if (!this.account) {
            throw new Error('Wallet no conectada');
        }

        try {
            // Convertir ETH a Wei
            const amountWei = this.web3.utils.toWei(amountEth.toString(), 'ether');
            
            // Crear transacción
            const tx = {
                from: this.account,
                to: this.contractAddress,
                value: amountWei,
                gas: 200000
            };
            
            console.log('📤 Enviando transacción:', tx);
            
            // Enviar transacción
            const receipt = await this.web3.eth.sendTransaction(tx);
            
            console.log('✅ Donación exitosa:', receipt);
            
            return {
                success: true,
                txHash: receipt.transactionHash,
                blockNumber: receipt.blockNumber,
                amount: amountEth,
                projectId: projectId
            };
            
        } catch (error) {
            console.error('❌ Error en donación:', error);
            throw error;
        }
    }

    /**
     * Obtener historial de donaciones del usuario
     */
    async getUserDonations(address = this.account) {
        if (!address) {
            throw new Error('Dirección no proporcionada');
        }

        try {
            // En producción, esto consultaría el smart contract
            // Por ahora, simulamos datos
            const mockDonations = [
                {
                    id: 'DON-2024-001',
                    amount: 500,
                    amountEth: 0.15,
                    projectId: 1,
                    projectName: 'Agua Potable - Guatemala',
                    timestamp: Date.now() - 86400000, // Hace 1 día
                    txHash: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb8',
                    status: 'completed',
                    percentage: {
                        project: 97,
                        platform: 3
                    },
                    stages: [
                        {
                            name: 'Donación Recibida',
                            status: 'completed',
                            timestamp: Date.now() - 86400000,
                            txHash: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb8'
                        },
                        {
                            name: 'Smart Contract Ejecutado',
                            status: 'completed',
                            timestamp: Date.now() - 86400000 + 120000
                        },
                        {
                            name: 'Transferido a ONG',
                            status: 'completed',
                            timestamp: Date.now() - 86400000 + 240000
                        },
                        {
                            name: 'Proyecto en Ejecución',
                            status: 'in_progress',
                            progress: 67
                        },
                        {
                            name: 'Impacto Verificado',
                            status: 'pending'
                        }
                    ]
                }
            ];
            
            return mockDonations;
            
        } catch (error) {
            console.error('❌ Error obteniendo donaciones:', error);
            throw error;
        }
    }

    /**
     * Buscar donación por ID o hash
     */
    async searchDonation(query) {
        try {
            console.log('🔍 Buscando:', query);
            
            // Verificar si es un hash de transacción
            if (query.startsWith('0x') && query.length === 42) {
                return await this.getDonationByTxHash(query);
            }
            
            // Buscar por ID
            return await this.getDonationById(query);
            
        } catch (error) {
            console.error('❌ Error en búsqueda:', error);
            throw error;
        }
    }

    /**
     * Obtener detalles de donación por hash
     */
    async getDonationByTxHash(txHash) {
        try {
            const tx = await this.web3.eth.getTransaction(txHash);
            const receipt = await this.web3.eth.getTransactionReceipt(txHash);
            
            return {
                txHash: txHash,
                from: tx.from,
                to: tx.to,
                value: this.web3.utils.fromWei(tx.value, 'ether'),
                blockNumber: receipt.blockNumber,
                status: receipt.status ? 'success' : 'failed',
                gasUsed: receipt.gasUsed
            };
            
        } catch (error) {
            console.error('❌ Error obteniendo transacción:', error);
            return null;
        }
    }

    /**
     * Obtener detalles de donación por ID
     */
    async getDonationById(donationId) {
        // En producción, consultaría el smart contract
        const donations = await this.getUserDonations();
        return donations.find(d => d.id === donationId);
    }

    /**
     * Formatear dirección de wallet
     */
    formatAddress(address) {
        if (!address) return '';
        return `${address.substring(0, 6)}...${address.substring(38)}`;
    }

    /**
     * Obtener balance de la wallet
     */
    async getBalance(address = this.account) {
        if (!address) return 0;
        
        try {
            const balanceWei = await this.web3.eth.getBalance(address);
            return this.web3.utils.fromWei(balanceWei, 'ether');
        } catch (error) {
            console.error('❌ Error obteniendo balance:', error);
            return 0;
        }
    }

    /**
     * Verificar transacción en explorador
     */
    getExplorerUrl(txHash, network = 'mumbai') {
        const baseUrl = this.networks[network].explorer;
        return `${baseUrl}/tx/${txHash}`;
    }

    /**
     * Callback cuando cambia la cuenta
     */
    onAccountChanged(newAccount) {
        console.log('🔄 Cuenta cambiada a:', newAccount);
        window.location.reload();
    }

    /**
     * Mostrar alerta de MetaMask
     */
    showMetaMaskAlert() {
        const install = confirm(
            'MetaMask no está instalado.\n\n' +
            '¿Deseas instalarlo ahora para poder realizar donaciones?\n\n' +
            'MetaMask es necesario para interactuar con blockchain de forma segura.'
        );
        
        if (install) {
            window.open('https://metamask.io/download/', '_blank');
        }
    }

    /**
     * Validar dirección Ethereum
     */
    isValidAddress(address) {
        return this.web3.utils.isAddress(address);
    }

    /**
     * Obtener timestamp formateado
     */
    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Exportar clase para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlockchainTracker;
}