import React, { useState } from "react";
import { motion } from "framer-motion";
import PageVariants from "../variants/PageVariants";
import Alert from "../components/Alert";

function AddExpense() {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <motion.div
      variants={PageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <form method="post" onSubmit={handleSubmit}>
        <Alert error={error} message={message} />
        <div className="layout-px-spacing">
          <div className="account-settings-container layout-top-spacing">
            <div className="account-content">
              <div
                className="scrollspy-example"
                data-spy="scroll"
                data-target="#account-settings-scroll"
                data-offset="-100"
              >
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 layout-spacing section general-info mb-4">
                    <div className="info">
                      <h6 className="">Informations Générales</h6>
                      <div className="row">
                        <div className="col-lg-11 mx-auto">
                          <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-3  d-flex justify-content-center border-right">
                              test
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 mt-md-0 mt-4">
                              <div className="form">
                                <div className="row">
                                  <div className="col-12">
                                    <div className="form-group">
                                      <label htmlFor="fullName">
                                        Nom de la boutique
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control mb-4"
                                        id="name"
                                        placeholder="Nom de la boutique"
                                        required
                                        // onChange={(e) =>
                                        //   setName(e.target.value)
                                        // }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="profession">Slogan</label>
                                  <input
                                    type="text"
                                    className="form-control mb-4"
                                    id="profession"
                                    placeholder="Slogan"
                                    // onChange={(e) => setSlogan(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 layout-spacing section general-info p-4 mb-4">
                    <button type="submit" className="btn btn-block btn-success">
                      Enregistrer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
}

export default AddExpense;
