import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const localStorageName = "so-cart";
  let cartProducts = getLocalStorage(localStorageName);
  if (cartProducts === null) {
    cartProducts = [];
  }
  cartProducts.push(product);
  setLocalStorage(localStorageName, cartProducts);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
