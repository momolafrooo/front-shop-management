import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ShopApi from "../../../APIs/ShopApi";
import { expand_area, menu, sub_menu } from "../../../redux/actions";
import { useParams } from "react-router-dom";

import { motion } from "framer-motion";
import PageVariants from "../variants/PageVariants";
import "./css/account-setting.css";

function ShowShop() {
  const [name, setName] = useState("");
  const [slogan, setSlogan] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [active, setActive] = useState(false);
  const [logo, setLogo] = useState(null);
  const [favicon, setFavicon] = useState(null);
  const params = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(menu("Boutiques"));
    dispatch(sub_menu("Afficher une boutique"));
    dispatch(expand_area("Boutiques"));

    const [body] = document.getElementsByTagName("body");
    const blockUI = document.createElement("script");

    blockUI.type = "text/javascript";
    blockUI.src = "/plugins/blockui/jquery.blockUI.min.js";
    body.appendChild(blockUI);

    const getShop = async () => {
      await ShopApi.showShop(params.id)
        .then((response) => {
          // console.log(response.data.shop);
          setName(response.data.shop.name);
          setSlogan(response.data.shop.slogan);
          setPhone1(response.data.shop.phone1);
          setPhone2(response.data.shop.phone2);
          setPhone3(response.data.shop.phone3);
          setEmail(response.data.shop.email);
          setAddress(response.data.shop.address);
          setWebsite(response.data.shop.site_web);
          setLinkedin(response.data.shop.linkedin);
          setFacebook(response.data.shop.facebook);
          setTwitter(response.data.shop.twitter);
          setInstagram(response.data.shop.instagram);
          setActive(response.data.shop.active);
          setLogo(response.data.shop.logo);
          setFavicon(response.data.shop.favicon);
        })
        .catch((error) => console.log("error", error));
    };

    getShop();

    return () => {
      blockUI.remove();
    };
  }, [dispatch, params.id]);

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
                      <div className="d-flex justify-content-between">
                        <h6 className="">Informations Générales</h6>
                        <span>
                          Cette boutique {active ? "active" : "inactive"}
                        </span>
                      </div>

                      <div className="row">
                        <div className="col-lg-11 mx-auto">
                          <div className="row">
                            <div className="col-xl-2 col-lg-2 col-md-2">
                              <div className="upload mt-4 pr-md-4">
                                <img
                                  src={logo || "/assets/img/boy.png"}
                                  alt="logo"
                                  style={{ width: "100%" }}
                                />
                                <p className="mt-2  text-center-md">
                                  <i className="flaticon-cloud-upload mr-1"></i>{" "}
                                  Logo
                                </p>
                              </div>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-2">
                              <div className="upload mt-4 pr-md-4">
                                <img
                                  src={favicon || "/assets/img/boy.png"}
                                  alt="favicon"
                                  style={{ width: "100%" }}
                                />
                                <p className="mt-2 text-center-md">
                                  <i className="flaticon-cloud-upload mr-1"></i>{" "}
                                  Favicon
                                </p>
                              </div>
                            </div>
                            <div className="col-xl-8 col-lg-8 col-md-8 mt-md-0 mt-4">
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
                                        value={name || ""}
                                        readOnly
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
                                    value={slogan || ""}
                                    readOnly
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-12 col-lg-12 col-md-12 layout-spacing section contact mb-4">
                    <div className="info">
                      <h5 className="">Contact</h5>
                      <div className="row">
                        <div className="col-md-11 mx-auto">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="address">Téléphone</label>
                                <input
                                  type="tel"
                                  className="form-control mb-4"
                                  id="phone1"
                                  placeholder="Téléphone n1"
                                  required
                                  value={phone1 || ""}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="address">Adresse</label>
                                <input
                                  type="text"
                                  className="form-control mb-4"
                                  id="address"
                                  placeholder="Adresse"
                                  required
                                  value={address || ""}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="address">Téléphone</label>
                                <input
                                  type="text"
                                  className="form-control mb-4"
                                  id="phone2"
                                  placeholder="Téléphone n2"
                                  value={phone2 || ""}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="phone">Email</label>
                                <input
                                  type="email"
                                  className="form-control mb-4"
                                  id="email"
                                  placeholder="Email"
                                  required
                                  value={email || ""}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="address">Téléphone</label>
                                <input
                                  type="tel"
                                  className="form-control mb-4"
                                  id="phone3"
                                  placeholder="Téléphone n3"
                                  value={phone3 || ""}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="website">Site Web</label>
                                <input
                                  type="text"
                                  className="form-control mb-4"
                                  id="website"
                                  placeholder="Site Web"
                                  value={website || ""}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-12 col-lg-12 col-md-12 layout-spacing section social mb-4">
                    <div className="info">
                      <h5 className="">Social</h5>
                      <div className="row">
                        <div className="col-md-11 mx-auto">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="input-group social-linkedin mb-3">
                                <div className="input-group-prepend mr-3">
                                  <span
                                    className="input-group-text"
                                    id="linkedin"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-linkedin"
                                    >
                                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                      <rect
                                        x="2"
                                        y="9"
                                        width="4"
                                        height="12"
                                      ></rect>
                                      <circle cx="4" cy="4" r="2"></circle>
                                    </svg>
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="linkedin"
                                  aria-label="Username"
                                  aria-describedby="linkedin"
                                  value={linkedin || ""}
                                  readOnly
                                />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="input-group social-tweet mb-3">
                                <div className="input-group-prepend mr-3">
                                  <span className="input-group-text" id="tweet">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-twitter"
                                    >
                                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                    </svg>
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Twitter"
                                  aria-label="Username"
                                  aria-describedby="tweet"
                                  value={twitter || ""}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-11 mx-auto">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="input-group social-fb mb-3">
                                <div className="input-group-prepend mr-3">
                                  <span className="input-group-text" id="fb">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-facebook"
                                    >
                                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                    </svg>
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Facebook"
                                  aria-label="Username"
                                  aria-describedby="fb"
                                  value={facebook || ""}
                                  readOnly
                                />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="input-group social-github mb-3">
                                <div className="input-group-prepend mr-3">
                                  <span
                                    className="input-group-text"
                                    id="github"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-github"
                                    >
                                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                    </svg>
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Instagram"
                                  aria-label="Username"
                                  aria-describedby="github"
                                  value={instagram || ""}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default ShowShop;
