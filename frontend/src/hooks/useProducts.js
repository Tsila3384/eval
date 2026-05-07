import { useState } from 'react';
import prestashopApi from '../services/prestashopApi';
import { parseProductsXML, parseProductXML } from '../services/xmlParser';

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const xmlData = await prestashopApi.getProducts(params);
            const parsedProducts = parseProductsXML(xmlData);
            console.log('✅ Produits parsés:', parsedProducts);
            console.log('📊 Premier produit:', parsedProducts[0]);
            setProducts(parsedProducts);
            return parsedProducts;
        } catch (err) {
            setError(err.message);
            console.error('Erreur fetchProducts:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchProduct = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const xmlData = await prestashopApi.getProduct(id);
            const product = parseProductXML(xmlData);
            return product;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        products,
        loading,
        error,
        fetchProducts,
        fetchProduct
    };
};

export default useProducts;