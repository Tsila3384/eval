export const checkPrestaShopConfig = () => {
    const url = import.meta.env.VITE_PRESTASHOP_URL;
    const wsKey = import.meta.env.VITE_PRESTASHOP_WS_KEY;
    
    const errors = [];
    
    if (!url) errors.push('❌ VITE_PRESTASHOP_URL manquante dans .env');
    if (!wsKey) errors.push('❌ VITE_PRESTASHOP_WS_KEY manquante dans .env');
    
    if (errors.length > 0) {
        console.error('=== Configuration PrestaShop invalide ===');
        errors.forEach(err => console.error(err));
        console.error('=========================================');
        return false;
    }
    
    console.log('✅ Configuration PrestaShop valide');
    console.log(`   URL: ${url}`);
    console.log(`   WS Key: ${wsKey.substring(0, 10)}...`);
    return true;
};