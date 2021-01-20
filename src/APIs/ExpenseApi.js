import Api from "./Api";

export default {
  AllExpenses() {
    return Api().get("all-expenses");
  },
  addExpense(data) {
    return Api().post("/add-expense", data);
  },
  showExpense(id) {
    return Api().get(`/show-expense/${id}`);
  },
  updateExpense(data, id) {
    return Api().post(`/update-expense/${id}`, data);
  },
  deleteExpense(id) {
    return Api().post(`/delete-expense/${id}`);
  },
};
