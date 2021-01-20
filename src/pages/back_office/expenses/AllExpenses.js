import React, { useEffect, useState } from "react";
import SimpleDatatableWithAddButton from "../components/SimpleDatatableWithAddButton";
import { motion } from "framer-motion";
import PageVariants from "../variants/PageVariants";
import ExpenseApi from "../../../APIs/ExpenseApi";
import { expand_area, menu, sub_menu } from "../../../redux/actions";
import { useDispatch } from "react-redux";

function AllExpenses() {
  const dispatch = useDispatch();
  const columns = {
    name: "Titre",
    description: "Description",
    amount: "Montant",
    created_at: "Date",
  };

  const [expenses, setExpenses] = useState([]);

  const getExpenses = async () => {
    dispatch(menu("Dépenses"));
    dispatch(sub_menu("Toutes les dépenses"));
    dispatch(expand_area("Dépenses"));

    return await ExpenseApi.AllExpenses()
      .then((response) => {
        console.log(response.data.expenses);
        setExpenses(response.data.expenses);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <motion.div
      variants={PageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <SimpleDatatableWithAddButton
        title="Liste des dépenses"
        columns={columns}
        data={expenses}
        onConfirm={ExpenseApi.deleteExpense}
        editURL="/dépenses/modifier-dépense"
        viewURL="/dépenses/afficher-dépenses"
      />
    </motion.div>
  );
}

export default AllExpenses;
