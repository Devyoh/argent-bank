import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, fetchUserProfile } from "../../store/actions/userActions";

import Navbar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

import "./signIn.css"

/**
 * Sign-in form that allows users to enter their email and password to log in to the application.
 * Checkbox to store user credentials for future logins.
 */

function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  // gérer la case à cocher "Remember me" :
  const [rememberMe, setRememberMe] = React.useState(false);
  // Ajouter un état pour gérer le message d'erreur personnalisé :
  const [customError, setCustomError] = React.useState("");

  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);

  const [loggedIn, setLoggedIn] = React.useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  React.useEffect(() => {
    if (localStorage.getItem("rememberMe") === "true") {
      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");
      if (storedEmail) setEmail(storedEmail);
      if (storedPassword) setPassword(storedPassword);
      setRememberMe(false);
    }

    // Check if a JWT is present in local storage
    if (localStorage.getItem("jwtToken")) {
      setLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const allowedCredentials = {
      "tony@stark.com": "password123",
      "steve@rogers.com": "password456",
    };

    // Vérifier si l'email entré est autorisé
    if (!Object.keys(allowedCredentials).includes(email)) {
      setCustomError("This email is not allowed");
      return;
    }

    // Vérifier si le mot de passe entré correspond au mot de passe de l'email autorisé
    if (allowedCredentials[email] !== password) {
      setCustomError("This password is not allowed");
      return;
    }

    try {
      const token = await dispatch(loginUser({ email, password })).unwrap();
      localStorage.setItem("jwtToken", token);
      await dispatch(fetchUserProfile(token)).unwrap();
      navigate("/profile");

      if (rememberMe) {
        localStorage.setItem("rememberMe", true);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loggedIn && <Navigate to="/profile" replace />}
      <Navbar />
      <main className="signIn">
        <section className="signIn-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="unique-email"
                value={email}
                autoComplete="new-email"
                onChange={handleEmailChange}
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="unique-password"
                value={password}
                autoComplete="new-password"
                onChange={handlePasswordChange}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <label className="rememberMe-label" htmlFor="remember-me">
                Remember me
              </label>
            </div>
            {customError && <p className="error-message">{customError}</p>}
            <button className="sign-in-button" type="submit">Sign In</button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SignIn;
