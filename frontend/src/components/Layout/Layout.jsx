import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useNotification } from '../../hooks/useNotification';

const Layout = () => {
    const { notification, hideNotification } = useNotification();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />
            <main className="container mx-auto px-4 py-8 animate-fade-in">
                {notification && (
                    <div className={`mb-6 p-4 rounded-lg shadow-md animate-slide-up ${
                        notification.type === 'success' 
                            ? 'bg-green-50 border-l-4 border-green-500 text-green-700' 
                            : 'bg-red-50 border-l-4 border-red-500 text-red-700'
                    }`}>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                {notification.type === 'success' ? (
                                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" 
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                                              clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" 
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                                              clipRule="evenodd" />
                                    </svg>
                                )}
                                <span>{notification.message}</span>
                            </div>
                            <button onClick={hideNotification} className="text-gray-400 hover:text-gray-600">
                                ✕
                            </button>
                        </div>
                    </div>
                )}
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;