const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  let jsonResponse = res.json(); 
  if (jsonResponse.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export async function getProductsByCategory(category) {
  console.log(category);
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  console.log(data.Result);
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
  const response = await fetch(baseURL + "login", options).then(convertToJson);
  return response.accessToken;
}

export async function getOrders() {
  const options = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  const response = await fetch(baseURL + "orders", options).then(convertToJson);
  return response;
}