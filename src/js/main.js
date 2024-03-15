import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const dataSource = new ProductData("tents");
const parentElement = document.querySelector(".product-list");
const productsList = new ProductListing("Tents", dataSource, parentElement);

productsList.init();
