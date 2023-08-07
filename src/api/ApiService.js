import axios from "axios";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/login",
      {
        email: email,
        password: password,
      }
    );
    const jwtToken = response.data.body.token;
    return jwtToken;
  } catch (error) {
    console.error("Error logging in:", error);

    if (error.response) {
      const errorCode = error.response.status;

      if (errorCode === 400) {
        console.error("Invalid fields or bad request.");
      } else if (errorCode === 500) {
        console.error("Internal server error.");
      }
    }
  }
};

export const getUserProfile = async (jwtToken) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/profile",
      {},
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return {
      status: response.data.status,
      message: response.data.message,
      body: response.data.body,
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return {
      status: error.response ? error.response.status : null,
      message: error.response ? error.response.data.message : null,
      body: null,
    };
  }
};

export const updateUserProfile = async (jwtToken, updatedProfile) => {
  try {
    const response = await axios.put(
      "http://localhost:3001/api/v1/user/profile",
      updatedProfile,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    if (response.status !== 200) {
      throw new Error("Erreur lors de la mise à jour du profil.");
    }
    return response.data.body;
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
};
