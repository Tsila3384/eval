import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        proxy: {
            '/prestashop-api': {
                target: 'https://localhost',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/prestashop-api/, '/prestashop_edition_classic_version_8.2.6/api')
            }
        }
    }
});