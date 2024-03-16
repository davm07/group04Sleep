import ShoppingCart from "./ShoppingCart.mjs";
import {
  getCartItemsQty,
  validateCartTotalPrice,
  loadHeaderFooter,
} from "./utils.mjs";

//Using promise to load the first part of the program to obtain the header and footer
loadHeaderFooter().then(() => {
  const cartElementQuantity = getCartItemsQty(".cart-qty");

  const cart = new ShoppingCart("so-cart", ".product-list");
  cart.renderCartContents();
  validateCartTotalPrice(cartElementQuantity);
});
