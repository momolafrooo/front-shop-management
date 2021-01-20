import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import UserApi from "../../../APIs/UserApi";
import AuthLayout from "../AuthLayout";

function ResetPassword() {
	const history = useHistory();
	const [password, setPassword] = useState("");
	const [password_confirmation, setPasswordConfirmation] = useState("");
	const [isValid, setIsValid] = useState(false);
	const [errors, setErrors] = useState([]);
	const [message, setMessage] = useState("");
	const { token } = useParams();

	const data = {
		token: token,
		password: password,
		password_confirmation: password_confirmation
	};

	function handleSubmit(e) {
		e.preventDefault();
		UserApi.resetPassword(data)
			.then(response => {
				setIsValid(true);
				setMessage(response.data.message);

				setTimeout(() => {
					history.replace("/connexion");
				}, 3000);
				console.log(response.data);
			})
			.catch(err => {
				setIsValid(false);
				setErrors(err.response.data.errors);
				console.log(err.response.data.errors);
			});
	}

	return (
		<AuthLayout>
			<h1 className="">Réinitialiser mot de passe</h1>
			<p className="mb-3">Saisissez votre nouveau mot de passe.</p>
			{isValid ? (
				<div role="alert" className="alert alert-success">
					{message}
				</div>
			) : (
				""
			)}
			<form className="text-left" onSubmit={handleSubmit}>
				<div className="form">
					<div
						id="password-field"
						className="field-wrapper input mb-2"
					>
						<div className="d-flex justify-content-between">
							<label htmlFor="password">
								NOUVEAU MOT DE PASSE
							</label>
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
							<rect
								x="3"
								y="11"
								width="18"
								height="11"
								rx="2"
								ry="2"
							></rect>
							<path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
						</svg>
						<input
							id="password"
							name="password"
							type="password"
							required
							className={`form-control ${
								isValid ? "is-valid" : ""
							}`}
							onChange={e => setPassword(e.target.value)}
							value={password}
							placeholder="Veuillez saisir votre nouveau mot de passe"
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
					<div
						id="password-field"
						className="field-wrapper input mb-2"
					>
						<div className="d-flex justify-content-between">
							<label htmlFor="password_confirmation">
								CONFIRMATION MOT DE PASSE
							</label>
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
							<rect
								x="3"
								y="11"
								width="18"
								height="11"
								rx="2"
								ry="2"
							></rect>
							<path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
						</svg>
						<input
							id="password_confirmation"
							name="password_confirmation"
							type="password"
							required
							className={`form-control ${
								isValid ? "is-valid" : ""
							}`}
							onChange={e =>
								setPasswordConfirmation(e.target.value)
							}
							value={password_confirmation}
							placeholder="Veuillez confirmer votre mot de passe"
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
							{errors.map((error, index) => (
								<li
									key={index}
									className="text-danger font-weight-bold"
								>
									{error}
								</li>
							))}
						</ul>
					</div>
					<div className="d-sm-flex justify-content-between">
						<div className="field-wrapper">
							<button type="submit" className="btn btn-primary">
								Réinitialiser
							</button>
						</div>
					</div>
				</div>
			</form>
		</AuthLayout>
	);
}

export default ResetPassword;
