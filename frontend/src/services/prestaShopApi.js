import config from '../config/prestashop.config';

class PrestaShopAPI {
    constructor() {
        this.wsKey = config.wsKey;
    }

    // GET - pour lire
    async get(endpoint) {
        const url = `/prestashop-api${endpoint}?ws_key=${this.wsKey}&display=full`;
        console.log(`📡 GET ${url}`);
        
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Accept': 'application/xml' }
        });
        
        const text = await response.text();
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return text;
    }

    // PUT - pour modifier (SANS display=full)
    async put(endpoint, id, xmlBody) {
        const url = `/prestashop-api${endpoint}/${id}?ws_key=${this.wsKey}`;
        console.log(`📡 PUT ${url}`);
        console.log(`📦 XML:`, xmlBody.substring(0, 300));
        
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/xml',
                'Accept': 'application/xml'
            },
            body: xmlBody
        });
        
        const text = await response.text();
        console.log(`📨 Status: ${response.status}`);
        console.log(`📨 Response:`, text.substring(0, 300));
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return text;
    }

    // Produits
    async getProducts() {
        return await this.get('/products');
    }

    async getProduct(id) {
        return await this.get(`/products/${id}`);
    }

    async updateProduct(id, xmlBody) {
        return await this.put('/products', id, xmlBody);
    }
}

const prestashopApi = new PrestaShopAPI();
export default prestashopApi;