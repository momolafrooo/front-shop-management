import React, { useState } from "react";
import UserApi from "../../../APIs/UserApi";
import AuthLayout from "../AuthLayout";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [erros, setErrors] = useState([]);
  const [message, setMessage] = useState("");

  const data = {
    email: email,
  };

  function handleSubmit(e) {
    e.preventDefault();
    UserApi.sendResetPasswordEmail(data)
      .then((response) => {
        setIsValid(true);
        setMessage(response.data.message);
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
      <h1 className="">Mot de passe oublié</h1>
      <p className="mb-3">Saisissez votre adresse email.</p>
      {isValid ? (
        <div role="alert" className="alert alert-success">
          {message}
        </div>
      ) : (
        ""
      )}
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
              required="required"
              className={`form-control ${isValid ? "is-valid" : ""}`}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Veuillez saisir votre adresse email"
            />
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
                Valider
              </button>
            </div>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}

export default ForgotPassword;
