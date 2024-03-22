import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
      convertedJSON = {};
  
    formData.forEach(function (value, key) {
      convertedJSON[key] = value;
    });
  
    return convertedJSON;
}

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
    // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
    const simplifiedItems = items.map((item) => {
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: item.Quantity,
        };
    });

    return simplifiedItems;
}
  

export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
  
    init() {
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary();
      // this.calculateOrdertotal();
    }
  
    calculateItemSummary() {
      // calculate and display the total amount of the items in the cart, and the number of items.
        const subtotalElement = document.querySelector(this.outputSelector + " #subtotal");
        const itemsNumElement = document.querySelector(this.outputSelector + " #num-items");

        itemsNumElement.innerHTML = this.list.reduce((total, item) => total + item.Quantity, 0);

        const amounts = this.list.map(item => item.Quantity * item.FinalPrice);
        this.itemTotal = amounts.reduce((total, amount) => total + amount, 0);
        subtotalElement.innerHTML = this.itemTotal;
    }
  
    calculateOrdertotal() {
      // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
      const itemsQty = this.list.reduce((total, item) => total + item.Quantity, 0);
      this.shipping = 10 + (itemsQty -1) * 2;

      this.tax = (this.itemTotal * 0.06).toFixed(2);
      this.orderTotal = (
        parseFloat(this.itemTotal) +
        parseFloat(this.shipping) +
        parseFloat(this.tax)
      ).toFixed(2);
  
      // display the totals.
      this.displayOrderTotals();
    }
  
    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary page
      const shippingElement = document.querySelector(this.outputSelector + " #shippEstimate");
      const taxElement = document.querySelector(this.outputSelector + " #tax");
      const orderTotalElement = document.querySelector(this.outputSelector + " #orderTotal");

      shippingElement.innerHTML = `$${this.shipping}`;
      taxElement.innerHTML = `$${this.tax}`;
      orderTotalElement.innerHTML = `$${this.orderTotal}`;
  
    }

    async checkout(form) {
        // build the data object from the calculated fields, the items in the cart, and the information entered into the form
        const formElement = document.forms["checkout"];

        const jsonObject = formDataToJSON(formElement);
        
        jsonObject.orderDate = new Date().toISOString();
        jsonObject.orderTotal = this.orderTotal;
        jsonObject.shipping = this.shipping;
        jsonObject.tax = this.tax;
        jsonObject.items = packageItems(this.list);

        // call the checkout method in our ExternalServices module and send it our data object.
        try {
          const res = await services.checkout(jsonObject);
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
  }