<script>
    import ProductSummary from "./ProductSummary.svelte";
    import { getProductsByCategory } from "../externalServices.mjs";
    // this is how we make a prop in svelte
    export let category;
    // if you are looking at this thinking that's strange to just stop with a promise
    // you would be right.  This will make more sense in a bit...stay tuned.
    console.log(category)
    let promise = getProductsByCategory(category);
</script>

<h2>Top products: {category}</h2>
{#await promise}
 Loading
 {:then products}
<ul class="product-list">
{#each products as product}
<li class="product-card"><ProductSummary {product}/> </li>
{/each}
</ul>
{/await}