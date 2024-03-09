import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { getCartItemsQty } from "./utils.mjs";

const dataSource = new ProductData("tents");
const parentElement = document.querySelector(".product-list");
const productsList = new ProductListing("Tents", dataSource, parentElement);
getCartItemsQty(".cart-qty");

productsList.init();
