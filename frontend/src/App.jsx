import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout/Layout';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './components/Products/ProductDetail';
function App() {
    return (
        <NotificationProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="products" element={<ProductsPage />} />
                        <Route path="products/:id" element={<ProductDetail />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </NotificationProvider>
    );
}

export default App;