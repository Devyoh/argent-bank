import React from "react";
import Logout from "../LogOut";
import { NavLink} from "react-router-dom";
import "./navBar.css"

const Navbar = ({ showLogout, displayName }) => {
  const isLoggedIn = localStorage.getItem("jwtToken") !== null;

  return (
    <nav className="main-nav">
      <NavLink to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={`${process.env.PUBLIC_URL}/assets/img/argentBankLogo.png`}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div className="nav-item">
        {showLogout && isLoggedIn ? (
          <>
            <div className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {displayName}
            </div>
            <Logout />
          </>
        ) : (
          <NavLink to={isLoggedIn ? "/profile" : "/login"}>
            <div className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {isLoggedIn ? displayName : "Sign In"}
            </div>
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
