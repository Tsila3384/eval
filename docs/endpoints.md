# API PrestaShop — Liste des Endpoints

> **Version :** PrestaShop Edition Classic 8.2.6  
> **Base URL :** `https://localhost/prestashop_edition_classic_version_8.2.6/api/`  
> **Méthodes disponibles sur tous les endpoints :** `GET` `PUT` `POST` `PATCH` `DELETE` `HEAD`

---

## 📦 Produits

| Endpoint | Description |
|---|---|
| `/products` | Les produits |
| `/categories` | Les catégories de produits |
| `/combinations` | Les combinaisons de produits (variantes) |
| `/product_features` | Les caractéristiques des produits |
| `/product_feature_values` | Les valeurs des caractéristiques produits |
| `/product_options` | Les options des produits |
| `/product_option_values` | Les valeurs des options produits |
| `/product_customization_fields` | Les champs de personnalisation produits |
| `/product_suppliers` | Les fournisseurs de produits |
| `/attachments` | Les pièces jointes de produits |
| `/tags` | Les tags des produits |
| `/manufacturers` | Les marques / fabricants |
| `/images` | Les images |
| `/image_types` | Les types d'images |

---

## 🛒 Commandes clients

| Endpoint | Description |
|---|---|
| `/orders` | Les commandes clients |
| `/order_details` | Les détails d'une commande |
| `/order_histories` | L'historique des commandes |
| `/order_invoices` | Les factures de commandes |
| `/order_payments` | Les paiements de commandes |
| `/order_carriers` | Les transporteurs des commandes |
| `/order_cart_rules` | Les règles de panier appliquées aux commandes |
| `/order_slip` | Les bons de retour / avoirs |
| `/order_states` | Les statuts de commande |

---

## 🛒 Paniers & Promotions

| Endpoint | Description |
|---|---|
| `/carts` | Les paniers clients |
| `/cart_rules` | Les règles de panier (codes promo, remises) |
| `/specific_prices` | La gestion des prix spécifiques |
| `/specific_price_rules` | Les règles de prix spécifiques |
| `/price_ranges` | Les tranches de prix |

---

## 👥 Clients

| Endpoint | Description |
|---|---|
| `/customers` | Les clients de la boutique |
| `/addresses` | Les adresses clients, marques et fournisseurs |
| `/groups` | Les groupes de clients |
| `/guests` | Les visiteurs non connectés |
| `/customizations` | Les valeurs de personnalisation |
| `/customer_messages` | Les messages du service client |
| `/customer_threads` | Les fils de discussion du service client |
| `/messages` | Les messages |

---

## 🚚 Livraison & Transport

| Endpoint | Description |
|---|---|
| `/carriers` | Les transporteurs |
| `/deliveries` | La livraison des produits |
| `/weight_ranges` | Les tranches de poids |
| `/zones` | Les zones géographiques des pays |

---

## 🏭 Stock & Approvisionnement

| Endpoint | Description |
|---|---|
| `/stocks` | Les stocks |
| `/stock_availables` | Les quantités disponibles |
| `/stock_movements` | Les mouvements de stock |
| `/stock_movement_reasons` | Les raisons des mouvements de stock |
| `/warehouses` | Les entrepôts |
| `/warehouse_product_locations` | Les emplacements des produits en entrepôt |
| `/supply_orders` | Les commandes fournisseurs |
| `/supply_order_details` | Les détails des commandes fournisseurs |
| `/supply_order_histories` | L'historique des commandes fournisseurs |
| `/supply_order_receipt_histories` | L'historique des réceptions fournisseurs |
| `/supply_order_states` | Les statuts des commandes fournisseurs |
| `/suppliers` | Les fournisseurs |

---

## 💰 Taxes & Fiscalité

| Endpoint | Description |
|---|---|
| `/taxes` | Les taux de taxe |
| `/tax_rules` | Les règles de taxe |
| `/tax_rule_groups` | Les groupes de règles de taxe |

---

## 🌍 Internationalisation

| Endpoint | Description |
|---|---|
| `/languages` | Les langues de la boutique |
| `/currencies` | Les devises |
| `/countries` | Les pays |
| `/states` | Les états / régions des pays |

---

## 🏪 Multiboutique

| Endpoint | Description |
|---|---|
| `/shops` | Les boutiques (fonctionnalité multiboutique) |
| `/shop_groups` | Les groupes de boutiques |
| `/shop_urls` | Les URLs des boutiques |
| `/stores` | Les magasins physiques |

---

## ⚙️ Configuration & Contenu

| Endpoint | Description |
|---|---|
| `/configurations` | La configuration de la boutique |
| `/translated_configurations` | La configuration traduite de la boutique |
| `/content_management_system` | Les pages CMS |
| `/contacts` | Les contacts de la boutique |
| `/employees` | Les employés / comptes administrateurs |
| `/search` | La recherche |

---

## 🔌 Intégrations tierces

| Endpoint | Description |
|---|---|
| `/klaviyo` | Les endpoints personnalisés Klaviyo (email marketing) |

---

## 📊 Récapitulatif

| Catégorie | Nombre d'endpoints |
|---|---|
| Produits | 14 |
| Commandes clients | 9 |
| Paniers & Promotions | 5 |
| Clients | 8 |
| Livraison & Transport | 4 |
| Stock & Approvisionnement | 12 |
| Taxes & Fiscalité | 3 |
| Internationalisation | 4 |
| Multiboutique | 4 |
| Configuration & Contenu | 6 |
| Intégrations tierces | 1 |
| **Total** | **70** |

---

*Source : Réponse XML de l'API PrestaShop Edition Classic 8.2.6*