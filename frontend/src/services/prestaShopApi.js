import config from '../config/prestashop.config';

class PrestaShopAPI {
    constructor() {
        this.baseURL = config.baseURL;
        this.wsKey = config.wsKey;
        this.debug = config.debug;
    }

    /**
     * Construction simple de l'URL
     */
    _buildURL(endpoint, params = {}) {
        // Nettoyer l'endpoint
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        
        // Construire l'URL de base
        let url = `${this.baseURL}${cleanEndpoint}`;
        
        // Ajouter la clé API
        const urlParams = new URLSearchParams();
        urlParams.append('ws_key', this.wsKey);
        
        // Ajouter display=full pour GET
        if (params.display || (!params.display && !endpoint.includes('?') && this.debug)) {
            urlParams.append('display', 'full');
        }
        
        // Ajouter les paramètres supplémentaires
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                urlParams.append(key, value);
            }
        });
        
        const finalUrl = `${url}?${urlParams.toString()}`;
        
        if (this.debug) {
            console.log('🌐 URL:', finalUrl);
        }
        
        return finalUrl;
    }

    /**
     * Requête GET simplifiée (sans timeout)
     */
    async get(endpoint, params = {}) {
        try {
            const url = this._buildURL(endpoint, params);
            console.log(`📡 GET ${url}`);
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/xml'
                }
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 100)}`);
            }
            
            const xmlString = await response.text();
            
            if (this.debug) {
                console.log(`✅ Réponse reçue (${xmlString.length} bytes)`);
                console.log('📄 Début du XML:', xmlString.substring(0, 300));
            }
            
            return xmlString;
            
        } catch (error) {
            console.error(`❌ Erreur GET ${endpoint}:`, error.message);
            throw error;
        }
    }

    /**
     * Requête POST
     */
    async post(endpoint, xmlBody) {
        try {
            const url = this._buildURL(endpoint);
            console.log(`📡 POST ${url}`);
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/xml',
                    'Accept': 'application/xml'
                },
                body: xmlBody
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 100)}`);
            }
            
            const xmlString = await response.text();
            return xmlString;
            
        } catch (error) {
            console.error(`❌ Erreur POST ${endpoint}:`, error);
            throw error;
        }
    }

    /**
     * Requête PUT
     */
    async put(endpoint, id, xmlBody) {
        try {
            const url = this._buildURL(`${endpoint}/${id}`);
            console.log(`📡 PUT ${url}`);
            
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/xml',
                    'Accept': 'application/xml'
                },
                body: xmlBody
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const xmlString = await response.text();
            return xmlString;
            
        } catch (error) {
            console.error(`❌ Erreur PUT ${endpoint}/${id}:`, error);
            throw error;
        }
    }

    /**
     * Requête DELETE
     */
    async delete(endpoint, id) {
        try {
            const url = this._buildURL(`${endpoint}/${id}`);
            console.log(`📡 DELETE ${url}`);
            
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/xml'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            return { success: true };
            
        } catch (error) {
            console.error(`❌ Erreur DELETE ${endpoint}/${id}:`, error);
            throw error;
        }
    }

    // ========== MÉTHODES PRODUITS ==========
    
    async getProducts(params = {}) {
        const xmlString = await this.get('/products', params);
        // Pour l'instant, retourne le XML brut
        // On ajoutera le parsing XML plus tard
        return xmlString;
    }

    async getProduct(id) {
        return await this.get(`/products/${id}`);
    }

    async createProduct(xmlBody) {
        return await this.post('/products', xmlBody);
    }

    async updateProduct(id, xmlBody) {
        return await this.put('/products', id, xmlBody);
    }

    async deleteProduct(id) {
        return await this.delete('/products', id);
    }

    // ========== MÉTHODES CLIENTS ==========
    
    async getCustomers(params = {}) {
        return await this.get('/customers', params);
    }

    async getCustomer(id) {
        return await this.get(`/customers/${id}`);
    }

    // ========== MÉTHODES COMMANDES ==========
    
    async getOrders(params = {}) {
        return await this.get('/orders', params);
    }

    async getOrder(id) {
        return await this.get(`/orders/${id}`);
    }
}

// Instance unique
const prestashopApi = new PrestaShopAPI();
export default prestashopApi;