import { getParam } from "./utils.mjs";
import { productDetails } from "./productDetails.mjs";

// Get product
const productId = getParam("product");
productDetails(productId, ".product-detail");