import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserApi from "../../../APIs/UserApi";
import { expand_area, menu, sub_menu } from "../../../redux/actions";
import AvatarUploader from "../components/AvatarUploader";
import { motion } from "framer-motion";

import "./css/switches.css";
import RoleApi from "../../../APIs/RoleApi";
import Alert from "../components/Alert";
import PageVariants from "../variants/PageVariants";
import ShopApi from "../../../APIs/ShopApi";

function AddUser() {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedShop, setSelectedShop] = useState("");
  const [shops, setShops] = useState([]);

  const getRoles = async () => {
    return await RoleApi.allRoles()
      .then((response) => {
        setRoles(response.data.roles);
        setSelectedRole(response.data.roles[0].id);
      })
      .catch((error) => console.log(error));
  };

  const getShops = async () => {
    return await ShopApi.allShops().then((response) => {
      setShops(Object.values(response.data.shops));
      setSelectedShop(response.data.shops[0].id);
    });
  };

  useEffect(() => {
    dispatch(menu("Utilisateurs"));
    dispatch(sub_menu("Ajouter un utilisateur"));
    dispatch(expand_area("Utilisateurs"));

    getRoles();
    getShops();
  }, [dispatch]);

  function handleUploadComplete(file) {
    setAvatar(file);
  }

  const data = {
    first_name,
    last_name,
    phone,
    address,
    email,
    password,
    password_confirmation,
    linkedin,
    facebook,
    twitter,
    instagram,
    active,
    avatar: avatar || "",
    role_id: selectedRole,
    shop_id: selectedShop,
  };

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    UserApi.addUser(formData)
      .then((response) => {
        setError(null);
        setMessage(null);
        setMessage(response.data.message);
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch((error) => {
        setMessage(null);
        setError(null);
        setError(error.response.data.errors);
        console.log(error);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  }

  return (
    <motion.form
      method="post"
      onSubmit={handleSubmit}
      variants={PageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Message section */}
      <Alert message={message} error={error} />
      {/* End Message section */}
      <div className="layout-px-spacing">
        <div className="account-settings-container layout-top-spacing">
          <div className="account-content">
            <div
              className="scrollspy-example"
              data-spy="scroll"
              data-target="#account-settings-scroll"
              data-offset="-100"
            >
              <div className="row mt-4">
                <div className="col-12 layout-spacing section general-info mb-4">
                  <div className="info">
                    <div className="d-flex justify-content-between">
                      <h6 className="">Informations Générales</h6>
                      <span>
                        <label className="switch s-primary mr-2">
                          <span
                            className="mr-3"
                            style={{ position: "absolute", right: "30px" }}
                          >
                            {active ? "Active" : "Inactive"}
                          </span>
                          <input
                            type="checkbox"
                            onChange={(e) => setActive(!active)}
                            checked={active || active === 1 ? true : false}
                          />
                          <span className="slider round"></span>
                        </label>
                      </span>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="row">
                          <div className="col-xl-3 col-lg-3 col-md-3 d-flex justify-content-center">
                            <div className="upload mt-4 pr-md-4">
                              <AvatarUploader
                                defaultImage="/assets/img/boy.png"
                                onUploadComplete={handleUploadComplete}
                              />
                              <p className="mt-2 text-center">
                                Photo de profil
                              </p>
                            </div>
                          </div>
                          <div className="col-xl-9 col-lg-9 col-md-9 mt-md-0 mt-4">
                            <div className="form">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="last_name">Nom</label>
                                    <input
                                      type="text"
                                      className="form-control mb-4"
                                      id="last_name"
                                      placeholder="Nom de l'utilisateur"
                                      onChange={(e) =>
                                        setLastName(e.target.value)
                                      }
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="fullName">Prénom</label>
                                    <input
                                      type="text"
                                      className="form-control mb-4"
                                      id="name"
                                      placeholder="Prénom de l'utilisateur"
                                      onChange={(e) =>
                                        setFirstName(e.target.value)
                                      }
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="fullName">Adresse</label>
                                    <input
                                      type="text"
                                      className="form-control mb-4"
                                      id="name"
                                      placeholder="Adresse de l'utilisateur"
                                      onChange={(e) =>
                                        setAddress(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label htmlFor="fullName">Téléphone</label>
                                    <input
                                      type="tel"
                                      className="form-control mb-4"
                                      id="name"
                                      placeholder="Téléphone de l'utilisateur"
                                      onChange={(e) => setPhone(e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="form-group">
                                    <label htmlFor="shop">Boutique</label>
                                    <select
                                      className="custom-select"
                                      value={selectedShop}
                                      onChange={(e) =>
                                        setSelectedShop(e.target.value)
                                      }
                                      id="shop"
                                    >
                                      {shops.map((shop) => (
                                        <option key={shop.id} value={shop.id}>
                                          {shop.name}
                                        </option>
                                      ))}
                                    </select>
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
                {/* Account Section */}
                <div className="col-xl-12 col-lg-12 col-md-12 layout-spacing section contact mb-4">
                  <div className="info">
                    <h5 className="">Compte</h5>
                    <div className="row">
                      <div className="col-md-11 mx-auto">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="email">Email</label>
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
                              <label htmlFor="email">Role</label>
                              <select
                                className="custom-select"
                                value={selectedRole}
                                onChange={(e) =>
                                  setSelectedRole(e.target.value)
                                }
                              >
                                {roles.map((role) => (
                                  <option key={role.id} value={role.id}>
                                    {role.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="password">Mot de passe</label>
                              <input
                                type="password"
                                className="form-control mb-4"
                                id="password"
                                placeholder="Mot de passe"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="password_confirmation">
                                Confirmation du Mot de passe
                              </label>
                              <input
                                type="password"
                                className="form-control mb-4"
                                id="password_confirmation"
                                placeholder="Confirmation du Mot de passe"
                                required
                                onChange={(e) =>
                                  setPasswordConfirmation(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Account Section */}
                {/* Social Section */}
                <div className="col-12 layout-spacing section social mb-4">
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
                                <span className="input-group-text" id="github">
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
                {/* End Social Section */}
                {/* Confirmation button */}
                <div className="col-xl-12 col-lg-12 col-md-12 layout-spacing section general-info p-4 mb-4">
                  <button type="submit" className="btn btn-block btn-success">
                    Enregistrer
                  </button>
                </div>
                {/* End confirmation button */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.form>
  );
}

export default AddUser;
