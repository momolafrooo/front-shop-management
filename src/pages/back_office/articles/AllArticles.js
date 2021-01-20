import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { expand_area, menu, sub_menu } from "../../../redux/actions";
import PageVariants from "../variants/PageVariants";

import { motion } from "framer-motion";

const AllArticles = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(menu("Articles"));
    dispatch(sub_menu("Tous les articles"));
    dispatch(expand_area("Articles"));
  });

  return (
    <motion.div
      variants={PageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      AllArticles
    </motion.div>
  );
};

export default AllArticles;
