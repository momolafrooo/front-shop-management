import React, { Component } from "react";
import { motion } from "framer-motion";
import PageVariants from "../variants/PageVariants";

export default class Error403 extends Component {
  render() {
    return (
      <motion.div
        variants={PageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="p-4">
          <div className="d-flex justify-content-center h-100">
            <img
              src="/assets/img/errors/403.svg"
              className="img-responsive"
              alt="erreur-403"
            />
          </div>
        </div>
      </motion.div>
    );
  }
}
