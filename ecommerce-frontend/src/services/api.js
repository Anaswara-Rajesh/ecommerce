import axios from "axios";
import { addVariant } from "../store/variantSlice";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

const getToken = () => {
  return localStorage.getItem("token");
};

export const registerUser = async (userData) => {
  console.log(userData, "userData>>>");
  const response = await api.post("/auth/register", userData);
  console.log(response, "response");
  return response.data;
};

export const loginUser = async (userData) => {
  console.log(userData, "userData");
  try {
    const response = await api.post("/auth/login", userData);
    console.log(response, "response");
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("email", response.data.email);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response.data);
    throw error.response.data;
  }
};

export const fetchProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const token = getToken();
  console.log(token, "tiken");
  const response = await api.post("/products", productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const token = getToken();
  const response = await api.put(`/products/${id}`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  const token = getToken();
  const response = await api.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchUser = async () => {
  const token = getToken();
  const response = await api.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createVariant = (variantData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post("/variants", variantData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(addVariant(response.data));
  } catch (error) {
    console.error("Error creating variant:", error);
  }
};

export const updateVariantById = (id, variantData) => {
  const token = localStorage.getItem("token");
  return api.put(`/variants/${id}`, variantData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteVariantById = (id) => {
  const token = localStorage.getItem("token");
  return api.delete(`/variants/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};



export default api;
