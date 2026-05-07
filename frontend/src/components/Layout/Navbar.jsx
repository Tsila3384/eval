import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const navItems = [
        { path: '/', label: 'Dashboard', icon: '📊' },
        { path: '/products', label: 'Produits', icon: '📦' },
        { path: '/customers', label: 'Clients', icon: '👥' },
        { path: '/orders', label: 'Commandes', icon: '🛒' },
        { path: '/import', label: 'Import CSV', icon: '📁' },
        { path: '/reset', label: 'Réinitialiser', icon: '🔄' }
    ];

    return (
        <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">PS</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            PrestaShop Admin
                        </span>
                    </div>
                    <div className="flex space-x-2">
                        {navItems.map(item => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        isActive
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`
                                }
                            >
                                <span className="mr-2">{item.icon}</span>
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;