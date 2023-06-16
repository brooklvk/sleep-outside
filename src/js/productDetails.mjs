import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./externalServices.mjs";
import { cartCount } from "./stores.mjs";

export async function productDetails(productId, selector) { 
  // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
  // once we have the product details we can render out the HTML
  let product = await findProductById(productId);

  if (product == undefined) //check if it is able to find the item.
  {  
    const errorMessage = document.querySelector(selector);
    errorMessage.insertAdjacentHTML("afterBegin", "<h2>Sorry we could not find that item!</h2>");
    return;
  }
  const el = document.querySelector(selector);
  el.insertAdjacentHTML("afterBegin", productDetailsTemplate(product));
  // add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", ()=> {
    addProductToCart(product);
    cartAnimation()
  });
}

function cartAnimation() {
  document.querySelector(".cart").style.animation = "shake 0.4s 5"
  setTimeout(function(){
    document.querySelector(".cart").style.animation = ""
  }, 600)
}

function addProductToCart(product) {
  let products = getLocalStorage("so-cart");
  if (products == null) {
    products = [];
  } 
  products.push(product);
  setLocalStorage("so-cart", products);
  cartCount.set();
}

function productDetailsTemplate(product){
  return `<h3 id="productName">${product.Brand.Name}</h3>
  <h2 class="divider" id="productNameWithoutBrand">${product.NameWithoutBrand}</h2>
  <img id="productImage" class="divider" src="${product.Images.PrimaryExtraLarge}" alt="${product.Name}" />
  <p class="suggested-price">$${product.SuggestedRetailPrice.toFixed(2)}</p>
  <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
  <p class="percent-off">${(product.FinalPrice / product.SuggestedRetailPrice * 100).toFixed(0)}% Off</p>
  <p class="product__description" id="productDescriptionHtmlSimple">${product.DescriptionHtmlSimple}</p>
  <div class="product-detail__add">
    <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
  </div>`;
}

/* <p class="product__color" id="productColorName">${product.Colors.ColorName}</p> */