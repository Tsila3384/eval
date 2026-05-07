import { useState } from 'react';
import ProductList from '../components/Products/ProductList';
import ProductForm from '../components/Products/ProductForm';
import useProducts from '../hooks/useProducts';
import { useNotification } from '../hooks/useNotification';

const ProductsPage = () => {
    const [showForm, setShowForm] = useState(false);
    const { createProduct, loading } = useProducts();
    const { showNotification } = useNotification();

    const handleCreateProduct = async (productData) => {
        try {
            await createProduct(productData);
            showNotification('Produit créé avec succès !', 'success');
            setShowForm(false);
        } catch (error) {
            showNotification(`Erreur: ${error.message}`, 'error');
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">📦 Gestion des produits</h1>
                    <p className="text-gray-500 mt-1">Gérez votre catalogue de produits</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary flex items-center space-x-2"
                >
                    <span>{showForm ? '←' : '+'}</span>
                    <span>{showForm ? 'Voir les produits' : 'Nouveau produit'}</span>
                </button>
            </div>

            {showForm ? (
                <ProductForm 
                    onSubmit={handleCreateProduct} 
                    onCancel={() => setShowForm(false)}
                    isLoading={loading}
                />
            ) : (
                <ProductList />
            )}
        </div>
    );
};

export default ProductsPage;