import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./utils.mjs";

updateCartCount();
import { loadHeaderFooter } from './utils.mjs';

// Homepage only needs header/footer
loadHeaderFooter();

productList.init();

// No product rendering here anymore.
// Category links on index.html will point to product_listing/index.html?category=...
