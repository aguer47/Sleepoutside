import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const CART_KEY = "so-cart";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      this.product = await this.dataSource.findProductById(this.productId);

      if (!this.product) throw new Error("Product not found");

      this.renderProductDetails();
      this.setupAddToCart();
    } catch (err) {
      console.error("Failed to load product:", err);
      document.querySelector(".product-detail").innerHTML =
        "<p>Sorry, product not found.</p>";
    }
  }

  renderProductDetails() {
    const product = this.product;

    // Main image
    const productImage = document.getElementById("productImage");
    productImage.src =
      product.PrimaryLarge ||
      (product.Images && product.Images[0]?.Large) ||
      "";
    productImage.alt = product.NameWithoutBrand;

    // Product info
    document.getElementById("productBrand").textContent = product.Brand.Name;
    document.getElementById("productName").textContent = product.NameWithoutBrand;
    document.getElementById("productPrice").textContent = `$${product.FinalPrice}`;
    document.getElementById("productColor").textContent = product.Colors[0].ColorName;
    document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

    
    const thumbContainer = document.getElementById("productThumbs");
    thumbContainer.innerHTML = "";
    if (product.Images && product.Images.length > 0) {
      product.Images.forEach((img) => {
        const thumb = document.createElement("img");
        thumb.src = img.Medium;
        thumb.alt = product.NameWithoutBrand;
        thumb.classList.add("thumb");
        thumb.addEventListener("click", () => {
          productImage.src = img.Large || img.Medium;
        });
        thumbContainer.appendChild(thumb);
      });
    }
  }

  setupAddToCart() {
    document.getElementById("add-to-cart").addEventListener("click", () => {
      this.addProductToCart();
      alert("Product added to cart!");
    });
  }

  addProductToCart() {
    const cartItems = getLocalStorage(CART_KEY) || [];
    const existingItem = cartItems.find((item) => item.Id === this.product.Id);

    //  Always ensure we save a usable image
    const productWithImage = {
      ...this.product,
      Image:
        (this.product.Images && this.product.Images[0]?.Medium) ||
        this.product.PrimaryMedium ||
        this.product.PrimaryLarge ||
        "",
    };

    if (existingItem) {
      existingItem.quantity = (Number(existingItem.quantity) || 1) + 1;
    } else {
      cartItems.push({ ...productWithImage, quantity: 1 });
    }

    setLocalStorage(CART_KEY, cartItems);
  }
}