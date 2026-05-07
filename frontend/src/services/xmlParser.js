import convert from 'xml-js';

// Fonction utilitaire pour échapper le XML (à déclarer une seule fois)
const escapeXml = (str) => {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
};

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
        
        const productsArray = Array.isArray(products) ? products : [products];
        
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
            if (product[field]._cdata !== undefined) {
                value = product[field]._cdata;
            } else if (product[field]._text !== undefined) {
                value = product[field]._text;
            } else {
                value = product[field];
            }
            
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
    
    // Extraire le nom
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
    
    // Extraire la description longue
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

/**
 * Construit le XML pour créer/modifier un produit
 */
export const buildProductXML = (productData) => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<prestashop xmlns:xlink="http://www.w3.org/1999/xlink">\n';
    xml += '  <product>\n';
    
    // ID (obligatoire pour update)
    if (productData.id) {
        xml += `    <id><![CDATA[${productData.id}]]></id>\n`;
    }
    
    // Nom
    xml += '    <name>\n';
    xml += `      <language id="1"><![CDATA[${productData.name || 'Nouveau produit'}]]></language>\n`;
    xml += '    </name>\n';
    
    // Prix
    xml += `    <price><![CDATA[${parseFloat(productData.price || 0).toFixed(2)}]]></price>\n`;
    
    // Référence
    xml += `    <reference><![CDATA[${productData.reference || ''}]]></reference>\n`;
    
    // Quantité
    xml += `    <quantity><![CDATA[${parseInt(productData.quantity || 0)}]]></quantity>\n`;
    
    // Actif
    xml += `    <active><![CDATA[${productData.active ? '1' : '0'}]]></active>\n`;
    
    // ID Catégorie par défaut
    xml += '    <id_category_default xlink:href="https://localhost/prestashop_edition_classic_version_8.2.6/api/categories/2"><![CDATA[2]]></id_category_default>\n';
    
    // ID Tax Rules Group
    xml += '    <id_tax_rules_group xlink:href="https://localhost/prestashop_edition_classic_version_8.2.6/api/tax_rule_groups/1"><![CDATA[1]]></id_tax_rules_group>\n';
    
    // Champs requis avec valeurs par défaut
    xml += '    <id_manufacturer><![CDATA[]]></id_manufacturer>\n';
    xml += '    <id_supplier><![CDATA[]]></id_supplier>\n';
    xml += '    <wholesale_price><![CDATA[]]></wholesale_price>\n';
    xml += '    <on_sale><![CDATA[]]></on_sale>\n';
    xml += '    <online_only><![CDATA[]]></online_only>\n';
    xml += '    <minimal_quantity><![CDATA[]]></minimal_quantity>\n';
    xml += '    <available_for_order><![CDATA[]]></available_for_order>\n';
    xml += '    <visibility><![CDATA[both]]></visibility>\n';
    xml += '    <condition><![CDATA[new]]></condition>\n';
    xml += '    <show_price><![CDATA[]]></show_price>\n';
    
    // Description courte
    if (productData.description_short) {
        xml += '    <description_short>\n';
        xml += `      <language id="1"><![CDATA[${productData.description_short}]]></language>\n`;
        xml += '    </description_short>\n';
    } else {
        xml += '    <description_short>\n';
        xml += '      <language id="1"><![CDATA[]]></language>\n';
        xml += '    </description_short>\n';
    }
    
    // Description longue
    if (productData.description) {
        xml += '    <description>\n';
        xml += `      <language id="1"><![CDATA[${productData.description}]]></language>\n`;
        xml += '    </description>\n';
    } else {
        xml += '    <description>\n';
        xml += '      <language id="1"><![CDATA[]]></language>\n';
        xml += '    </description>\n';
    }
    
    xml += '  </product>\n';
    xml += '</prestashop>';
    
    console.log('📦 XML généré:', xml);
    return xml;
};