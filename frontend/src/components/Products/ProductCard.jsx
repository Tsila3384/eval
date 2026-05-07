import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const name = product?.name || 'Sans nom';
    const reference = product?.reference || 'N/A';
    const quantity = typeof product?.quantity === 'number' ? product.quantity : 0;
    const price = typeof product?.price === 'number' ? product.price.toFixed(2) : '0.00';
    
    const getStockStatus = (qty) => {
        if (qty <= 0) return { text: 'Rupture', color: 'bg-red-100 text-red-700', icon: '🔴' };
        if (qty < 10) return { text: 'Stock faible', color: 'bg-orange-100 text-orange-700', icon: '🟠' };
        return { text: 'En stock', color: 'bg-green-100 text-green-700', icon: '🟢' };
    };

    const stock = getStockStatus(quantity);

    return (
        <Link to={`/products/${product.id}`} className="block transform transition-all duration-300 hover:scale-105">
            <div className="card bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <span className="text-6xl">📦</span>
                    </div>
                    <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${stock.color}`}>
                            {stock.icon} {stock.text}
                        </span>
                    </div>
                </div>
                
                <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-800">
                        {name}
                    </h3>
                    
                    <p className="text-gray-500 text-sm mb-3">
                        Réf: {reference}
                    </p>
                    
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-2xl font-bold text-blue-600">
                            {price} €
                        </span>
                        <span className="text-sm text-gray-500">
                            Stock: {quantity}
                        </span>
                    </div>

                    {product?.description_short && (
                        <p className="text-gray-600 text-sm line-clamp-2">
                            {String(product.description_short).replace(/<[^>]*>/g, '')}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;