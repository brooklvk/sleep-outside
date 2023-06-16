<script>
    export let product = {};
</script>

<a href="../product_pages/index.html?product={product.Id}">
    <img
    src="{product.Images.PrimaryMedium}"
    alt="{product.Name}"
    />
    <h3 class="card__brand">{product.Brand.Name}</h3>
    <h2 class="card__name">{product.NameWithoutBrand}</h2>
    <p class="suggested-price">${product.SuggestedRetailPrice.toFixed(2)}</p>
    <p class="product-card__price">${product.FinalPrice.toFixed(2)}</p>
    <p class="percent-off">{(product.FinalPrice / product.SuggestedRetailPrice * 100).toFixed(0)}% Off</p>
</a>
