import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/reducer/userReducer";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

/**
 * React component that handles user logout.
 * When clicked, it triggers user logout, removes JWT from local storage,
 * and redirects to the home page.
 */
const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("jwtToken");
    navigate("/");
  };

  return (
    <NavLink className="main-nav-item" to="/" onClick={handleLogout}>
      <i className="fa fa-sign-out"></i>
      Sign Out
    </NavLink>
  );
};

export default LogOut;
