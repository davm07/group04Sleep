import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { getParams, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const category = getParams("category");
const dataSource = new ProductData();
const parentElement = document.querySelector(".product-list");
const productsList = new ProductListing(category, dataSource, parentElement);

productsList.init();
