const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getProductsByCategory(category) {
  console.log(category)
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
  // something in these lines below is breaking... the promise is being rejected. I wonder if it's not finding the id
  // const products = await getProductsByCategory();
  // return products.find((item) => item.Id === id);
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}

export async function loginRequest(creds) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  };
  return await fetch(baseURL + "login", options).then(convertToJson);
}

export async function getOrders() {
  const options = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  return await fetch(baseURL + "orders", options).then(convertToJson);
}