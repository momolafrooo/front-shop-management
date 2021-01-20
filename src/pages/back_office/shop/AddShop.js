import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ShopApi from "../../../APIs/ShopApi";
import { expand_area, menu, sub_menu } from "../../../redux/actions";

import "./css/account-setting.css";
import "./css/dropify.min.css";
import Alert from "../components/Alert";
import AvatarUploader from "../components/AvatarUploader";

import { motion } from "framer-motion";
import PageVariants from "../variants/PageVariants";

function AddShop() {
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
  const [active] = useState(false);
  const [logo, setLogo] = useState(null);
  const [favicon, setFavicon] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const data = {
    name: name,
    slogan: slogan,
    phone1: phone1,
    phone2: phone2,
    phone3: phone3,
    email: email,
    address: address,
    website: website,
    linkedin: linkedin,
    facebook: facebook,
    twitter: twitter,
    instagram: instagram,
    active: active,
    logo: logo || "",
    favicon: favicon || "",
  };

  var form_data = new FormData();

  for (var key in data) {
    form_data.append(key, data[key]);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(menu("Boutiques"));
    dispatch(sub_menu("Ajouter une boutique"));
    dispatch(expand_area("Boutiques"));

    const [body] = document.getElementsByTagName("body");
    const account_setting = document.createElement("script");
    const blockUI = document.createElement("script");

    account_setting.type = "text/javascript";
    account_setting.src = "/assets/js/users/account-settings.js";
    body.appendChild(account_setting);

    blockUI.type = "text/javascript";
    blockUI.src = "/plugins/blockui/jquery.blockUI.min.js";
    body.appendChild(blockUI);

    return () => {
      blockUI.remove();
      account_setting.remove();
    };
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    ShopApi.addShop(form_data)
      .then((response) => {
        console.log(response.data.message);
        setMessage(response.data.message);
        setError(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.errors);
        setMessage(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  }

  function handleLogoUploadComplete(file) {
    setLogo(file);
  }

  function handleFaviconUploadComplete(file) {
    setFavicon(file);
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
                              <div
                                className="upload mt-4 pr-md-4"
                                style={{ border: "none" }}
                              >
                                <AvatarUploader
                                  defaultImage="/assets/img/boy.png"
                                  onUploadComplete={handleLogoUploadComplete}
                                />
                                <p className="mt-2  text-center">
                                  <i className="flaticon-cloud-upload mr-1"></i>{" "}
                                  Logo
                                </p>
                              </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-3 d-flex justify-content-center">
                              <div
                                className="upload mt-4 pr-md-4"
                                style={{ border: "none" }}
                              >
                                <AvatarUploader
                                  defaultImage="/assets/img/boy.png"
                                  onUploadComplete={handleFaviconUploadComplete}
                                />
                                <p className="mt-2 text-center">
                                  <i className="flaticon-cloud-upload mr-1"></i>{" "}
                                  Favicon
                                </p>
                              </div>
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
                                        onChange={(e) =>
                                          setName(e.target.value)
                                        }
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
                                    onChange={(e) => setSlogan(e.target.value)}
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
                                  onChange={(e) => setPhone1(e.target.value)}
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
                                  onChange={(e) => setAddress(e.target.value)}
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
                                  onChange={(e) => setPhone2(e.target.value)}
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
                                  onChange={(e) => setEmail(e.target.value)}
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
                                  onChange={(e) => setPhone3(e.target.value)}
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
                                  onChange={(e) => setWebsite(e.target.value)}
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
                                  onChange={(e) => setLinkedin(e.target.value)}
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
                                  onChange={(e) => setTwitter(e.target.value)}
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
                                  onChange={(e) => setFacebook(e.target.value)}
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
                                  onChange={(e) => setInstagram(e.target.value)}
                                />
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

export default AddShop;
