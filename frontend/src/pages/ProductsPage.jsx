import { useState } from 'react';
import ProductList from '../components/Products/ProductList';
import ProductForm from '../components/Products/ProductForm';
import useProducts from '../hooks/useProducts';
import { useNotification } from '../hooks/useNotification';

const ProductsPage = () => {
    const [showForm, setShowForm] = useState(false);
    const { createProduct } = useProducts();
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
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Gestion des produits</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    {showForm ? 'Voir produits' : '+ Nouveau produit'}
                </button>
            </div>

            {showForm ? (
                <ProductForm onSubmit={handleCreateProduct} onCancel={() => setShowForm(false)} />
            ) : (
                <ProductList />
            )}
        </div>
    );
};

export default ProductsPage;