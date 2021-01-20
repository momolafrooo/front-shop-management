import Api from "./Api";

export default {
  login(data) {
    return Api().post("/login", data);
  },

  logout(id) {
    return Api().post("/logout", id);
  },

  sendResetPasswordEmail(data) {
    return Api().post("/send-reset-password-email", data);
  },

  resetPassword(data) {
    return Api().post("/reset-password", data);
  },

  allUsers() {
    return Api().get("/all-users");
  },

  deleteUser(id) {
    return Api().post(`/delete-user/${id}`);
  },

  addUser(data) {
    return Api().post("/add-user", data);
  },

  showUser(id) {
    return Api().get(`/show-user/${id}`);
  },

  updateUser(id, data) {
    return Api().post(`/update-user/${id}`, data);
  },
};
