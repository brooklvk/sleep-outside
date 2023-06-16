<script>
    import ProductSummary from "./ProductSummary.svelte";
    import { getProductsByCategory } from "../externalServices.mjs";
    // this is how we make a prop in svelte
    export let category;
    // if you are looking at this thinking that's strange to just stop with a promise
    // you would be right.  This will make more sense in a bit...stay tuned.
    console.log(category)
    let promise = getProductsByCategory(category);

    let selected;
</script>

<h2>Top Products: {category}</h2>
<div class="sort">
<p>Sort By: </p>
<select bind:value="{selected}" class="sort-by" name="sort-by">
    <option value="by-name" selected>Name (A-Z)</option>
    <option value="by-price">Price (High-Low)</option>
</select>
</div>

{#await promise}
Loading...
{:then products}

<ul class="product-list">

{#if selected = "by-name"} 
    {products.sort((a, b) => (a.Brand.Name > b.Brand.Name) ? 1 : -1)}
    {#each products as product}
        <li class="product-card"><ProductSummary {product}/></li>
    {/each}

{:else if selected = "by-price"} 
    {products.sort((a, b) => (a.FinalPrice > b.FinalPrice) ? -1 : 1)}
    {#each products as product}
        <li class="product-card"><ProductSummary {product}/></li>
    {/each}
{/if}

</ul>
{/await}
