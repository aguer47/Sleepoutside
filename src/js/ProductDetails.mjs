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
      document.querySelector(".product-detail").innerHTML = "<p>Sorry, product not found.</p>";
    }
  }

  renderProductDetails() {
    const product = this.product;

    const productImage = document.getElementById("p-image");
    productImage.src = product.Images?.PrimaryLarge || "";
    productImage.alt = product.NameWithoutBrand;

    document.getElementById("p-brand").textContent = product.Brand.Name;
    document.getElementById("p-name").textContent = product.NameWithoutBrand;
    document.getElementById("p-price").textContent = `$${product.FinalPrice}`;
    document.getElementById("p-color").textContent = product.Colors[0].ColorName;
    document.getElementById("p-description").innerHTML = product.DescriptionHtmlSimple;

    const thumbContainer = document.getElementById("p-thumbs");
    thumbContainer.innerHTML = "";
    if (product.Images?.ExtraImages?.length > 0) {
      product.Images.ExtraImages.forEach((img) => {
        const thumb = document.createElement("img");
        thumb.src = img.Src;
        thumb.alt = img.Title || product.NameWithoutBrand;
        thumb.classList.add("thumb");
        thumb.addEventListener("click", () => {
          productImage.src = img.Src;
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

    const productWithImage = {
      ...this.product,
      Image:
        this.product.Images?.PrimaryMedium ||
        this.product.Images?.PrimaryLarge ||
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