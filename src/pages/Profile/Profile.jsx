import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Account from "../../components/Account/Account";
import EditableName from "../../components/EditableName/EditableName";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/NavBar/NavBar";

import { fetchUserProfile, updateUserProfile} from "../../store/actions/userActions";

import accountData from "../../data/accounData";
import "./profile.css"

const ProfilePage = () => {
  const profile = useSelector((state) => state.user.profile);
  const error = useSelector((state) => state.user.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");

  // Updates the display name when the profile is loaded
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.fullName);
    }
  }, [profile]);

  /**
   * Updates user name in profile.
   * The user's new full name.
   */
  const handleNameUpdate = async (newName) => {
    const jwtToken = localStorage.getItem("jwtToken");
    const updatedProfile = {
      firstName: newName.split(" ")[0],
      lastName: newName.split(" ")[1],
    };

    // Call the "updateUserProfile" action to update the user's profile
    // with the new information (updatedProfile), using the JWT token
    dispatch(updateUserProfile({ token: jwtToken, updatedProfile }));

    setDisplayName(newName);
  };

  useEffect(() => {
    // Retrieve JWT token from localStorage
    const jwtToken = localStorage.getItem("jwtToken");
    // Check if JWT token exists
    if (!jwtToken) {
      // If user is not logged in (no JWT token found), redirect to login page
      navigate("/login");
    } else {
      // If a JWT token is present (user is logged in),
      // Retrieve user profile from backend API
      dispatch(fetchUserProfile(jwtToken));
    }
  }, [dispatch, navigate]);

  return (
    <>
      <Navbar showLogout={true} displayName={displayName} />
      {error && <p className="error-message">Error: {error}</p>}
      <main className="main-profile">
        <div className="header">
          <h1 className="profile-title">
            Welcome back <br /> 
            <span className="name">{displayName}</span> <br />
            {profile && (
              <EditableName fullName={profile.fullName} onSave={handleNameUpdate}/>
            )}
          </h1>
        </div>
        <h2 className="sr-only">Accounts</h2>
        {accountData.map((account) => (
          <Account
            // concatenates the title and the account number, to obtain a unique key for each element, even if the account numbers are identical
            key={`${account.title}-${account.accountNumber}`}
            title={account.title}
            accountNumber={account.accountNumber}
            amount={account.amount}
            description={account.description}
          />
        ))}
      </main>
      <Footer />
    </>
  );
};
export default ProfilePage;
