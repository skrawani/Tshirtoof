import { API } from "../../backend";

//category
//create
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//get all categories
export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//delete

export const deleteCategory = (categoryId, userId, token) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//update
export const updateCategory = (categoryId, userId, token, category) => {
  console.log(category);

  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//product calss

//create Product
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//get ALL Products
export const getProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//delete
export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//get a product
export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//update
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//Orders

export const getOrders = (userId, token) => {
  return fetch(`${API}/order/all/${userId}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//get order status
export const getOrderStatus = (userId) => {
  return fetch(`${API}/order/all/${userId}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//update order staus
export const updateOrderStatus = (orderId, userId, token, status) => {
  // console.log("STATUS", status.status);
  const value = {
    orderId,
    status: status.status,
  };

  return fetch(`${API}/order/${orderId}/status/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(value),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getOrderDetails = (userId, orderId, token) => {
  return fetch(`${API}/order/${orderId}/${userId}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
