<script>
    let tax = 0;
</script>

<form name="checkout" on:submit|preventDefault={handleSubmit}>
    <fieldset>
      <legend>Shipping</legend>
      <div class="checkout__name">
        <label for="fname">First Name</label>
        <input name="fname" required />
        <label for="lname">Last Name</label>
        <input name="lname" required />
      </div>
      <div class="checkout__address">
        <label for="street">Street</label>
        <input name="street" required />
        <label for="city">City</label>
        <input name="city" required />
        <label for="state">State</label>
        <input name="state" required />
        <label for="zip">Zip</label>
        <input name="zip" id="zip" required on:blur={calculateOrdertotal} />
      </div>
    </fieldset>
    <fieldset>
      <legend>Payment</legend>
      <label for="cardNumber">Card number</label>
      <input
        name="cardNumber"
        required
        placeholder="No spaces or dashes!"
        maxlength="16"
        minlength="16"
      />
      <label for="expiration">Expiration</label>
      <input name="expiration" required placeholder="mm/yy" />
      <label for="code">Security Code</label>
      <input name="code" required placeholder="xxx" maxlength="3" minlength="3" />
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