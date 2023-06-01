const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getData(category) {
  console.log(category)
  //const response = await fetch(baseURL + `products/search/${category}`);
  const response = await fetch(baseURL + `products/search/tents`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const products = await getData();
  return products.find((item) => item.Id === id);
}
