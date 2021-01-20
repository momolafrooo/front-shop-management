import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserApi from "../../../APIs/UserApi";
import AuthLayout from "../AuthLayout";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [erros, setErrors] = useState([]);

  const data = {
    email: email,
    password: password,
  };

  function handleSubmit(e) {
    e.preventDefault();

    UserApi.login(data)
      .then((response) => {
        setIsValid(true);
        localStorage.setItem("SHOP-MANAGEMENT-TOKEN", response.data.token);
        localStorage.setItem(
          "SHOP-MANAGEMENT-USER",
          JSON.stringify(response.data.user)
        );

        history.replace("/");
        console.log(response.data);
      })
      .catch((err) => {
        setIsValid(false);
        setErrors(err.response.data.errors);
        console.log(err.response.data.errors);
      });
  }

  return (
    <AuthLayout>
      <h1 className="">Connexion</h1>
      <p className="">Connectez vous pour continuer.</p>
      <form className="text-left" onSubmit={handleSubmit}>
        <div className="form">
          <div id="username-field" className="field-wrapper input">
            <label htmlFor="username">EMAIL</label>
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
              className="feather feather-user"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={`form-control ${isValid ? "is-valid" : ""}`}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Veuillez saisir votre adresse email"
            />
          </div>

          <div id="password-field" className="field-wrapper input mb-2">
            <div className="d-flex justify-content-between">
              <label htmlFor="password">MOT DE PASSE</label>
              <Link to="mot-de-passe-oublié" className="forgot-pass-link">
                Mot de passe oublié?
              </Link>
            </div>
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
              className="feather feather-lock"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input
              id="password"
              name="password"
              type="password"
              required
              className={`form-control ${isValid ? "is-valid" : ""}`}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Veuillez saisir votre mot de passe"
            />
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
              id="toggle-password"
              className="feather feather-eye"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </div>
          <div>
            <ul>
              {erros.map((error, index) => (
                <li key={index} className="text-danger font-weight-bold">
                  {error}
                </li>
              ))}
            </ul>
          </div>
          <div className="d-sm-flex justify-content-between">
            <div className="field-wrapper">
              <button type="submit" className="btn btn-primary">
                Se Connecter
              </button>
            </div>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}

export default Login;
