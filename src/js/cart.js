import { getLocalStorage } from "./utils.mjs";

// let total;

function renderCartContents() {
  const cartItems = [];
  for (var i = 0; i < localStorage.length; i++) {
    cartItems.push(getLocalStorage("so-cart" + i));
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // create a total variable
  let total = 0;
  // add total cost of all cart items and set to div element in cart index
  const addCartTotal = cartItems.map((product) => total += product.FinalPrice); //addTotal(item)
  // addCartTotal = total;
  console.log(addCartTotal);
  document.querySelector(".cart-footer").innerHTML = cartTotalElement(total);
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

// function addTotal(items) {
//   total += items.FinalPrice;

//   return total;

  // if (items.length == 1) {
  //   total = items.FinalPrice;
  // }
  // else {
  //   total += items.FinalPrice;
  // }
// }

function cartTotalElement(total) {
  const totalElement = `<p class="cart-total">Total: $${total}</p>`;

  return totalElement
}

renderCartContents();
