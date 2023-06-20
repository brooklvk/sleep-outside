<script>
  import { getLocalStorage } from "../utils.mjs";
  import { checkout } from "../externalServices.mjs";
  import { formDataToJSON } from "../utils.mjs";
  import { alertMessage } from "../utils.mjs";
  // props
  export let key = "";

  // state vars
  let list = [];
  let itemTotal = 0;
  let shipping = 0;
  let tax = 0;
  let orderTotal = 0;

  // initial setup
  const init = function () {
    list = getLocalStorage(key);
    calculateItemSummary();
  };

  // calculate order subtotal from the cart items
  const calculateItemSummary = function () {
    const amounts = list.map((item) => item.FinalPrice);
    itemTotal = amounts.reduce((sum, item) => sum + item);
  };

  // calculate the shipping, tax, and orderTotal
  const calculateOrdertotal = function () {
    tax = (itemTotal * .06).toFixed(2);
    shipping = 10 + (2 * (list.length - 1));
    orderTotal = (parseFloat(itemTotal) + parseFloat(tax) + parseFloat(shipping)).toFixed(2);
  };

  function packageItems(items) {
    const packedItems = items.map((product) => {
      return {
        id: product.Id,
        price: product.FinalPrice,
        name: product.Name,
        quantity: 1,
      };
    });
    return packedItems;
  }

  // Replace the default action taken by the browser.
  const handleSubmit = async function (e) {
    const json = formDataToJSON(e.target);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = orderTotal;
    json.tax = tax;
    json.shipping = shipping;
    json.items = packageItems(list);
    console.log(json);
    try {
      const res = await checkout(json);
      console.log(res);
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");
    } catch (err) {
      for (let message in err.message){
        alertMessage(`Invalid ${err}`, scroll=true);
      }
      console.log(err);
    }
  };

  // initial setup
  init();
</script>

<!-- <h1>Jonas</h1> -->

<form name="checkout" on:submit|preventDefault={handleSubmit}>
  <fieldset>
    <legend>Shipping</legend>
    <div class="checkout__name">
      <label for="fname">First Name</label>
      <input name="fname" id="fname" required />
      <label for="lname">Last Name</label>
      <input name="lname" id="lname" required />
    </div>
    <div class="checkout__address">
      <label for="street">Street</label>
      <input name="street" id="street" required />
      <label for="city">City</label>
      <input name="city" id="city" required />
      <label for="state">State</label>
      <input name="state" id="state" required />
      <label for="zip">Zip</label>
      <input name="zip" id="zip" required on:blur={calculateOrdertotal} />
    </div>
  </fieldset>
  <fieldset>
    <legend>Payment</legend>
    <label for="cardNumber">Card number</label>
    <input
      name="cardNumber"
      id="cardNumber"
      required
      placeholder="No spaces or dashes!"
      maxlength="16"
      minlength="16"
    />
    <label for="expiration">Expiration</label>
    <input name="expiration" id="expiration" required placeholder="mm/yy"  />
    <!-- pattern="(0[0-1]1[0-9]/2[2-3]3[0-9])" -->
    <label for="code">Security Code</label>
    <input name="code" id="code" required placeholder="xxx" maxlength="3" minlength="3" />
  </fieldset>
    <fieldset class="checkout-summary">
      <legend>Order Summary</legend>
      <ul>
        <li>
          <label for="cartTotal">Item Subtotal({list.length})</label>
          <p name="cartTotal" id="cartTotal">${itemTotal}</p>
        </li>
        <li>
          <label for="shipping">Shipping Estimate</label>
          <p id="shipping">${shipping}</p>
        </li>
        <li>
          <label for="tax">Tax</label>
          <p id="tax">${tax}</p>
        </li>
        <li>
          <label for="orderTotal"><b>Order Total</b></label>
          <p id="orderTotal">${orderTotal}</p>
        </li>
      </ul>
    </fieldset>

    <button id="checkoutSubmit" type="submit">Checkout</button>
</form>

<style>
  form {
    max-width: 500px;
    margin: 0 auto;
  }
  * + fieldset {
    margin-top: 1em;
  }
  label {
    display: block;
  }
  input {
    width: 100%;
    font-size: 1.2em;
  }

  .checkout-summary > ul {
    padding-left: 0;
    list-style-type: none;
  }
  .checkout-summary li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>