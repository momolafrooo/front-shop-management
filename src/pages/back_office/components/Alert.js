import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { AnimatePresence, motion } from "framer-motion";

function Alert({ message, error }) {
  function isSuccess() {
    if (message && !error) {
      return "alert-success";
    } else if (!message && error) {
      return "alert-danger";
    } else {
      return "";
    }
  }

  const AlertVariants = {
    initial: { opacity: 0, x: "100vw" },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        delay: 0.3,
        ease: "easeInOut",
        type: "spring",
      },
    },
    exit: {
      opacity: 0,
      x: "100vw",
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      {message || error ? (
        <AnimatePresence>
          <motion.div
            className={`alert ${isSuccess()} mb-4 mt-4`}
            style={{ width: "100%" }}
            role="alert"
            variants={AlertVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <button
              style={{ fontSize: "0.5rem" }}
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <CloseIcon color="primary" />
            </button>
            {message || (
              <ul>
                {Array.isArray(error)
                  ? error.map((error, index) => (
                      <li key={index} className="text-danger font-weight-bold">
                        {error}
                      </li>
                    ))
                  : error}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        ""
      )}
    </>
  );
}

export default Alert;
