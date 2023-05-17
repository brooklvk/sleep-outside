import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

let product = {};

export async function productDetails(productId, selector) {
  // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
  console.log("it works2")
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  const el = document.querySelector(selector);
  el.insertAdjacentHTML("afterBegin", productDetailsTemplate(product));
  // add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", ()=> {
    addProductToCart(product);
  });
}

function addProductToCart(item) {
  let items = getLocalStorage("so-cart");
  if (items == null) {
    items = [];
  } 
  items.push(item);
  setLocalStorage("so-cart", items);
}

function productDetailsTemplate(item){
  return `<h3 id="productName">${item.Name}</h3>
  <h2 class="divider" id="productNameWithoutBrand">${item.NameWithoutBrand}</h2>
  <img id="productImage" class="divider" src="${item.Image}" alt="${item.Name}" />
  <p class="product-card__price" id="productFinalPrice">${item.FinalPrice}</p>
  <p class="product__color" id="productColorName">${item.Colors.ColorName}</p>
  <p class="product__description" id="productDescriptionHtmlSimple">${item.DescriptionHtmlSimple}</p>
  <div class="product-detail__add">
    <button id="addToCart" data-id="${item.Id}">Add to Cart</button>
  </div>`;
}