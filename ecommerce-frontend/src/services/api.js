import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const registerUser = async (userData) => {
    console.log(userData,"userData>>>");
  const response = await api.post("/auth/register", userData);
  console.log(response,"response");
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

export default api;
