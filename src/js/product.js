import { getParams, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices();

const productId = getParams("product");

const product = new ProductDetails(productId, dataSource);

product.init();
