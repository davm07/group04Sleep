import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.Quantity}</p>
    <p class="cart-card__price">Unit Price: <b>$${item.FinalPrice.toFixed(2)}</b><span>Total Price: <b>$${(item.FinalPrice * item.Quantity).toFixed(2)}</b></span></p>
  </li>`;
  
    return newItem;
  }

export default class ShoppingCart {
    constructor(key, parentSelector) {
            this.key = key;
            this.parentSelector = parentSelector;
    }

    renderCartContents() {
        const cartItems = getLocalStorage(this.key);
        if (cartItems == null){
          return
        }
        const htmlItems = cartItems.map((item) => cartItemTemplate(item));
        document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
      }
}