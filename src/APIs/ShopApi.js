import Api from "./Api";

export default {
  allShops() {
    return Api().get("/all-shops");
  },
  addShop(data) {
    return Api().post("/add-shop", data);
  },
  showShop(id) {
    return Api().get(`/show-shop/${id}`);
  },
  updateShop(data, id) {
    return Api().post(`/update-shop/${id}`, data);
  },
  deleteShop(id) {
    return Api().post(`/delete-shop/${id}`);
  },
};
