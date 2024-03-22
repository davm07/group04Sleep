import { getLocalStorage, setLocalStorage, getCartItemsQty, alertMessage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);
        // once we have the product details we can render out the HTML
        document.querySelector("main").innerHTML = this.renderProductDetails();
        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        document.getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(this));
    }

    addToCart() {
      let items = getLocalStorage("so-cart") || [];
      let products = [];
      let existingProduct = items.find(item => item.Id === this.productId);
  
      if (existingProduct) {
          // If the product already exists in the cart, increment its quantity
          products = items.map(item => {
              if (item.Id === this.productId) {
                  item.Quantity = (item.Quantity || 1) + 1;
              }
              return item;
          });
      } else {
          // If the product doesn't exist in the cart, add it with quantity 1
          this.product.Quantity = 1;
          products = [...items, this.product];
      }
  
      setLocalStorage("so-cart", products);
      alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
      getCartItemsQty(".cart-qty");
  }

    renderProductDetails() {
        return `<section class="product-detail">
        <h3>${this.product.Brand.Name}</h3>

        <h2 class="divider">${this.product.NameWithoutBrand}</h2>

        <img
          class="divider"
          src="${this.product.Images.PrimaryLarge}"
          alt="${this.product.Name}"
        />

        <p class="product-card__price">$${this.product.FinalPrice}</p>

        <p class="product__color">${this.product.Colors[0].ColorName}</p>

        <p class="product__description">
            ${this.product.DescriptionHtmlSimple}
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>
      </section>`;
    }
}