import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");

loadHeaderFooter();
myCheckout.init();

document
  .querySelector("#zip")
  .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));

document.querySelector("#checkout-btn").addEventListener("click", (e) => {
  e.preventDefault();

  myCheckout.checkout();
});
