import convert from 'xml-js';

/**
 * Parse un XML produit par PrestaShop
 */
export const parseProductsXML = (xmlString) => {
    try {
        const result = convert.xml2js(xmlString, {
            compact: true,
            spaces: 2,
            ignoreComment: true,
            ignoreDeclaration: false
        });
        
        const products = result?.prestashop?.products?.product;
        
        if (!products) return [];
        
        // Toujours retourner un tableau
        const productsArray = Array.isArray(products) ? products : [products];
        
        // Nettoyer chaque produit
        return productsArray.map(product => cleanProductData(product));
        
    } catch (error) {
        console.error('Erreur parsing XML:', error);
        return [];
    }
};

/**
 * Nettoie les données d'un produit
 */
const cleanProductData = (product) => {
    const cleaned = {};
    
    // Extraire les champs principaux avec conversion de type
    const fields = {
        id: 'string',
        reference: 'string',
        price: 'number',
        quantity: 'number',
        active: 'boolean',
        date_add: 'string',
        date_upd: 'string'
    };
    
    Object.entries(fields).forEach(([field, type]) => {
        let value = null;
        
        if (product[field]) {
            // Gérer les CDATA et text
            if (product[field]._cdata !== undefined) {
                value = product[field]._cdata;
            } else if (product[field]._text !== undefined) {
                value = product[field]._text;
            } else {
                value = product[field];
            }
            
            // Conversion de type
            if (value !== null && value !== undefined) {
                switch (type) {
                    case 'number':
                        cleaned[field] = parseFloat(value) || 0;
                        break;
                    case 'boolean':
                        cleaned[field] = value === '1' || value === true;
                        break;
                    default:
                        cleaned[field] = String(value);
                }
            } else {
                cleaned[field] = type === 'number' ? 0 : (type === 'boolean' ? false : '');
            }
        } else {
            cleaned[field] = type === 'number' ? 0 : (type === 'boolean' ? false : '');
        }
    });
    
    // Extraire le nom (multi-langue)
    if (product.name && product.name.language) {
        const languages = Array.isArray(product.name.language) ? product.name.language : [product.name.language];
        const firstLanguage = languages[0];
        cleaned.name = firstLanguage?._cdata || firstLanguage?._text || 'Sans nom';
    } else {
        cleaned.name = 'Sans nom';
    }
    
    // Extraire la description courte
    if (product.description_short && product.description_short.language) {
        const languages = Array.isArray(product.description_short.language) 
            ? product.description_short.language 
            : [product.description_short.language];
        const firstLanguage = languages[0];
        cleaned.description_short = firstLanguage?._cdata || firstLanguage?._text || '';
    } else {
        cleaned.description_short = '';
    }
    
    // Extraire la description
    if (product.description && product.description.language) {
        const languages = Array.isArray(product.description.language) 
            ? product.description.language 
            : [product.description.language];
        const firstLanguage = languages[0];
        cleaned.description = firstLanguage?._cdata || firstLanguage?._text || '';
    } else {
        cleaned.description = '';
    }
    
    return cleaned;
};

/**
 * Parse un seul produit
 */
export const parseProductXML = (xmlString) => {
    try {
        const result = convert.xml2js(xmlString, {
            compact: true,
            spaces: 2,
            ignoreComment: true
        });
        
        const product = result?.prestashop?.product;
        if (!product) return null;
        
        return cleanProductData(product);
        
    } catch (error) {
        console.error('Erreur parsing produit:', error);
        return null;
    }
};