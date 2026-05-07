import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import ProductForm from './ProductForm';
import DeleteProductModal from './DeleteProductModal';
import { useNotification } from '../../hooks/useNotification';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchProduct, updateProduct, deleteProduct, loading } = useProducts();
    const { showNotification } = useNotification();
    
    const [product, setProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false); // ⚠️ IMPORTANT: doit être false au départ
    const [error, setError] = useState(null);

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {
        try {
            const data = await fetchProduct(id);
            setProduct(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdate = async (formData) => {
        try {
            await updateProduct(id, formData);
            showNotification('Produit modifié avec succès !', 'success');
            setIsEditing(false);
            await loadProduct();
        } catch (err) {
            showNotification(`Erreur: ${err.message}`, 'error');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteProduct(id);
            showNotification('Produit supprimé avec succès !', 'success');
            navigate('/products');
        } catch (err) {
            showNotification(`Erreur: ${err.message}`, 'error');
            setShowDeleteModal(false);
        }
    };

    if (loading && !product) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} onRetry={loadProduct} />;
    if (!product) return <div className="text-center py-8">Produit non trouvé</div>;

    if (isEditing) {
        return (
            <ProductForm
                product={product}
                onSubmit={handleUpdate}
                onCancel={() => setIsEditing(false)}
                isLoading={loading}
            />
        );
    }

    return (
        <>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
                {/* En-tête */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                            <p className="text-blue-100">Réf: {product.reference || 'N/A'}</p>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                ✏️ Modifier
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(true)} // Ouvre le modal seulement au clic
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                🗑️ Supprimer
                            </button>
                        </div>
                    </div>
                </div>

                {/* Contenu */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-700 mb-2">Informations générales</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Prix :</span>
                                    <span className="font-bold text-blue-600">{product.price} €</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Quantité :</span>
                                    <span className="font-semibold">{product.quantity || 0}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Statut :</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {product.active ? 'Actif' : 'Inactif'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-700 mb-2">Dates</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Créé le :</span>
                                    <span>{product.date_add ? new Date(product.date_add).toLocaleDateString() : 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Modifié le :</span>
                                    <span>{product.date_upd ? new Date(product.date_upd).toLocaleDateString() : 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {product.description_short && (
                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-700 mb-2">Description courte</h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-gray-600">{product.description_short}</p>
                            </div>
                        </div>
                    )}

                    {product.description && (
                        <div>
                            <h3 className="font-semibold text-gray-700 mb-2">Description longue</h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-gray-600 whitespace-pre-wrap">{product.description}</p>
                            </div>
                        </div>
                    )}

                    <div className="mt-6 flex justify-between items-center pt-4 border-t">
                        <button
                            onClick={() => navigate('/products')}
                            className="text-gray-600 hover:text-gray-800"
                        >
                            ← Retour à la liste
                        </button>
                        <div className="text-sm text-gray-400">
                            ID: {product.id}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de suppression - toujours après le contenu principal */}
            <DeleteProductModal
                product={product}
                onConfirm={handleDelete}
                onCancel={() => setShowDeleteModal(false)}
                isLoading={loading}
                isOpen={showDeleteModal}  // Ajoute cette prop
            />
        </>
    );
};

export default ProductDetail;