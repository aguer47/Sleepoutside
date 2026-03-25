

import { renderListWithTemplate, updateCartCount } from "./utils.mjs";

import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
      <a href="product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}" />
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
      <button class="add-to-cart" data-id="${product.Id}">Add to Cart</button>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
  const list = await this.dataSource.getData(this.category);
  this.renderList(list);

  const titleElement = document.querySelector(".title");

  if (titleElement) {
    titleElement.textContent = this.category;
  }
}

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);

    const buttons = this.listElement.querySelectorAll(".add-to-cart");

    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.dataset.id;

        const product = list.find((item) => item.Id == id);

        this.addToCart(product);
      });
    });
  }

  
  addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("so-cart")) || [];

  //  Ensure we save an Image field
  const productWithImage = {
    ...product,
    Image:
      product.Images?.PrimaryMedium ||
      product.Images?.PrimaryLarge ||
      (product.Images && product.Images[0]?.Medium) ||
      "",
  };

  cart.push(productWithImage);

  localStorage.setItem("so-cart", JSON.stringify(cart));
  
  updateCartCount();

  alert(`${product.NameWithoutBrand} added to cart!`);
 }
}