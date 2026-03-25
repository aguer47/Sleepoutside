// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function loadHeaderFooter() {
  // load header
  fetch("/components/header.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("main-header").innerHTML = html;
    });

  // load footer
  fetch("/components/footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("main-footer").innerHTML = html;
    });
}

export function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  const cartElement = document.querySelector(".cart-count");

  if (cartElement) {
    cartElement.textContent = cart.length;
  }
export async function loadHeaderFooter() {
  // simple placeholder (so your app doesn't break)
}