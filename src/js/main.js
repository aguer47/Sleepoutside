import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount, getParam, loadHeaderFooter } from "./utils.mjs";
import Alert from "./alert.js";

loadHeaderFooter();

// Get parameters from URL
const category = getParam('category');
const productId = getParam('product');

// Create instances
const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');

// Show products section when category is selected
if (category) {
  const productsSection = document.querySelector('.products');
  if (productsSection) productsSection.style.display = 'block';
  
  // Create product list with specific category
  const productList = new ProductList(category, dataSource, listElement);
  productList.init();
} else {
  // Hide products section when no category
  const productsSection = document.querySelector('.products');
  if (productsSection) productsSection.style.display = 'none';
}

// Function to show category products on homepage
function showCategoryProducts(category) {
  // Set URL parameter without page reload
  const url = new URL(window.location);
  url.searchParams.set('category', category);
  
  // Update URL without reloading page
  window.history.replaceState({}, '', url.toString());
}

if (productId) {
  // Show products section and hide other containers
  const categoriesSection = document.querySelector('.categories');
  const heroSection = document.querySelector('.hero');
  const missionSection = document.querySelector('.mission');
  
  if (categoriesSection) categoriesSection.style.display = 'none';
  if (heroSection) heroSection.style.display = 'none';
  if (missionSection) missionSection.style.display = 'none';
  
  // Create product list with specific product
  const productList = new ProductList(category, dataSource, listElement);
  productList.init();
} else {
  // Show categories and hide products section
  const categoriesSection = document.querySelector('.categories');
  const heroSection = document.querySelector('.hero');
  const missionSection = document.querySelector('.mission');
  
  if (categoriesSection) categoriesSection.style.display = 'grid';
  if (heroSection) heroSection.style.display = 'block';
  if (missionSection) missionSection.style.display = 'block';
}

// Initialize and render alerts
const alert = new Alert();
alert.render();
