import { useState } from 'react';
import prestashopApi from '../services/prestashopApi';
import { parseProductsXML, parseProductXML, buildProductXML } from '../services/xmlParser';

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // READ - Liste des produits
    const fetchProducts = async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const xmlData = await prestashopApi.getProducts(params);
            const parsedProducts = parseProductsXML(xmlData);
            console.log('✅ Produits chargés:', parsedProducts.length);
            setProducts(parsedProducts);
            return parsedProducts;
        } catch (err) {
            setError(err.message);
            console.error('Erreur fetchProducts:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // READ - Un seul produit
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

    // CREATE - Créer un produit
    const createProduct = async (productData) => {
        setLoading(true);
        setError(null);
        try {
            const xmlBody = buildProductXML(productData);
            const result = await prestashopApi.createProduct(xmlBody);
            console.log('✅ Produit créé avec succès');
            await fetchProducts(); // Rafraîchir la liste
            return result;
        } catch (err) {
            setError(err.message);
            console.error('Erreur createProduct:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // UPDATE - Modifier un produit
    const updateProduct = async (id, productData) => {
        setLoading(true);
        setError(null);
        try {
            // S'assurer que l'ID est présent
            productData.id = id;
            const xmlBody = buildProductXML(productData);
            const result = await prestashopApi.updateProduct(id, xmlBody);
            console.log('✅ Produit modifié avec succès');
            await fetchProducts(); // Rafraîchir la liste
            return result;
        } catch (err) {
            setError(err.message);
            console.error('Erreur updateProduct:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // DELETE - Supprimer un produit
    const deleteProduct = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const result = await prestashopApi.deleteProduct(id);
            console.log('✅ Produit supprimé avec succès');
            await fetchProducts(); // Rafraîchir la liste
            return result;
        } catch (err) {
            setError(err.message);
            console.error('Erreur deleteProduct:', err);
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
        fetchProduct,
        createProduct,
        updateProduct,
        deleteProduct
    };
};

export default useProducts;