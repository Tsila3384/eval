import { useState, useEffect } from 'react';

const ProductForm = ({ product, onSubmit, onCancel, isLoading }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        reference: '',
        quantity: '',
        description_short: '',
        description: '',
        active: true
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                price: product.price || '',
                reference: product.reference || '',
                quantity: product.quantity || '',
                description_short: product.description_short || '',
                description: product.description || '',
                active: product.active === 1 || product.active === true
            });
        }
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    {product ? '✏️ Modifier le produit' : '➕ Nouveau produit'}
                </h2>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                )}
            </div>
            
            <div className="space-y-4">
                <div>
                    <label className="label">Nom du produit *</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="input"
                        placeholder="Ex: T-shirt Premium"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="label">Prix (€) *</label>
                        <input
                            type="number"
                            name="price"
                            step="0.01"
                            required
                            value={formData.price}
                            onChange={handleChange}
                            className="input"
                            placeholder="0.00"
                        />
                    </div>

                    <div>
                        <label className="label">Quantité</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="input"
                            placeholder="0"
                        />
                    </div>
                </div>

                <div>
                    <label className="label">Référence</label>
                    <input
                        type="text"
                        name="reference"
                        value={formData.reference}
                        onChange={handleChange}
                        className="input"
                        placeholder="Réf: PROD-001"
                    />
                </div>

                <div>
                    <label className="label">Description courte</label>
                    <textarea
                        name="description_short"
                        rows="2"
                        value={formData.description_short}
                        onChange={handleChange}
                        className="input"
                        placeholder="Brève description du produit..."
                    />
                </div>

                <div>
                    <label className="label">Description longue</label>
                    <textarea
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        className="input"
                        placeholder="Description détaillée du produit..."
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="active"
                        id="active"
                        checked={formData.active}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="active" className="ml-2 block text-sm text-gray-700">
                        Produit actif (visible dans la boutique)
                    </label>
                </div>

                <div className="flex space-x-3 pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                {product ? 'Mise à jour...' : 'Création...'}
                            </span>
                        ) : (
                            product ? 'Mettre à jour' : 'Créer le produit'
                        )}
                    </button>
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 btn-secondary"
                        >
                            Annuler
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default ProductForm;