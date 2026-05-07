import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { checkPrestaShopConfig } from './utils/checkEnv';
import './index.css'

// Vérifier la configuration au démarrage
checkPrestaShopConfig();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);