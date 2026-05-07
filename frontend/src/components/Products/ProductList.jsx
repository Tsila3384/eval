import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import useProducts from '../../hooks/useProducts';

const ProductList = () => {
    const { products, loading, error, fetchProducts } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        fetchProducts({ limit: 20 });
    }, []);

    useEffect(() => {
        if (products && products.length > 0) {
            const filtered = products.filter(product => {
                const name = product?.name ? String(product.name).toLowerCase() : '';
                const reference = product?.reference ? String(product.reference).toLowerCase() : '';
                const search = searchTerm.toLowerCase();
                return name.includes(search) || reference.includes(search);
            });
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts([]);
        }
    }, [products, searchTerm]);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} onRetry={fetchProducts} />;

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="🔍 Rechercher un produit par nom ou référence..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input pl-10"
                    />
                    <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            
            <div className="mb-6 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                    📊 {filteredProducts.length} produit(s) trouvé(s)
                </div>
                <button 
                    onClick={() => fetchProducts({ limit: 20 })}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                    🔄 Actualiser
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            
            {filteredProducts.length === 0 && products.length > 0 && (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                    <span className="text-6xl mb-4 block">🔍</span>
                    <p className="text-gray-500 text-lg">Aucun produit ne correspond à votre recherche</p>
                    <button 
                        onClick={() => setSearchTerm('')}
                        className="mt-4 btn-primary"
                    >
                        Effacer la recherche
                    </button>
                </div>
            )}

            {products.length === 0 && !loading && (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                    <span className="text-6xl mb-4 block">📦</span>
                    <p className="text-gray-500 text-lg">Aucun produit trouvé dans la boutique</p>
                </div>
            )}
        </div>
    );
};

export default ProductList;