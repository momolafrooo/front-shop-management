import axios from "axios";

const baseApi = axios.create({
  baseURL: "http://localhost:8000/api",
});

const Api = function () {
  const token = localStorage.getItem("SHOP-MANAGEMENT-TOKEN");

  if (token) {
    baseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return baseApi;
};

export default Api;
