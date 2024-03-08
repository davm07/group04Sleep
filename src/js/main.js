import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const parentElement = document.querySelector(".product-list");
const productsList = new ProductListing(null, dataSource, parentElement);

productsList.init();
