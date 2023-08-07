import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser as loginUserApi,
  getUserProfile as getUserProfileApi,
  updateUserProfile as updateUserProfileApi,
} from "../../api/ApiService";

/**
 * Async action to authenticate a user.
 * Use the `loginUser` method to send an authentication request.
 * if the request succeeds, returns the authentication token.
 */
export const loginUser = createAsyncThunk("user/loginUser", async ({ email, password }) => {
    const token = await loginUserApi(email, password);
    return token;
  }
);

/**
 * Async action to retrieve a user's profile.
 * Use the `getUserProfile` method to send a request for user profile data.
 * If the request succeeds, returns the profile data of the user associated with this token.
 */
export const fetchUserProfile = createAsyncThunk("user/fetchUserProfile", async (token) => {
    const userProfile = await getUserProfileApi(token);
    return userProfile;
  }
);

/**
 * Asynchronous action to update a user's profile.
 * Use the `updateUserProfile` method to send a user profile update request.
 * If the query succeeds, returns the user's updated profile data
 * On error, rejects the promise with the error message.
 */
export const updateUserProfile = createAsyncThunk("user/updateUserProfile", async ({ token, updatedProfile }, { rejectWithValue }) => {
    try {
      const data = await updateUserProfileApi(token, updatedProfile);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
