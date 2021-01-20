import React, { useEffect } from "react";
import { contract_area, menu, sub_menu } from "../../../redux/actions";
import { useDispatch } from "react-redux";

import { motion } from "framer-motion";
import PageVariants from "../variants/PageVariants";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(menu("Tableau de bord"));
    dispatch(contract_area());
    dispatch(sub_menu(""));
  });

  return (
    <motion.div
      variants={PageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      Dashboard
    </motion.div>
  );
};

export default Dashboard;
