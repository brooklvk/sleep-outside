import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  // for (var i = 0; i < localStorage.length; i++) {
  //   cartItems.push(getLocalStorage("so-cart" + i));
  // }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  
  // Add event listeners to all of the X buttons.
  const xButtons = document.querySelectorAll(".removeBtn")
  xButtons.forEach(x => {
    x.addEventListener("click", removeFromCart);
  });
}

function removeFromCart(e) {
  // Pull the contents of the cart and remove selected item.
  let cItems = getLocalStorage("so-cart");
  const selectedItem = e.target.attributes[0].value;
  // console.log(selectedItem);
  // console.log(cItems);
  // console.log(cItems[0].Id);

  const newItems = cItems.filter((item) => item.Id != selectedItem);
  setLocalStorage("so-cart", newItems);
  renderCartContents();
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
  <span id="${item.Id}" class="removeBtn">&#10005;</span>
</li>`;
  return newItem;
}

renderCartContents();
