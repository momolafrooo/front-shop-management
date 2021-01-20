import Api from "./Api";

export default {
  allRoles() {
    return Api().get("/all-roles");
  },
  addRole(data) {
    return Api().post("/add-role", data);
  },
  showRole(id) {
    return Api().get(`/show-role/${id}`);
  },
  updateRole(data, id) {
    return Api().post(`/update-role/${id}`, data);
  },
  deleteRole(id) {
    return Api().post(`/delete-role/${id}`);
  },
};
