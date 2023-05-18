import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // create a total variable
  let total = 0;
  if (htmlItems != 0) {
    // add total cost of all cart items and set to div element in cart index
    const addCartTotal = cartItems.map((product) => total += product.FinalPrice);
    document.querySelector(".cart-footer").innerHTML = cartTotalElement(total);
  } 
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function cartTotalElement(total) {
  const totalElement = `<p class="cart-total">Total: $${total}</p>`;

  return totalElement
}

renderCartContents();
