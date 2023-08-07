import React from "react";

import Navbar from "../../components/NavBar/NavBar";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <Navbar />
      <div className="center-page">
        <h1>404</h1>
        <p>Oups! La page que vous demandez n'existe pas.</p>
        <NavLink to="/">Retourner sur la page d’accueil</NavLink>
      </div>
    </div>
  );
};

export default NotFound;
