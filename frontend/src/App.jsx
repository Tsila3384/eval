import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout/Layout';
import ProductsPage from './pages/ProductsPage';


function App() {
    return (
        <NotificationProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="products" element={<ProductsPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </NotificationProvider>
    );
}

export default App;