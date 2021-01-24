import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGIN, LOGOUT, SIGNUP } from "./types";
import axios from "axios";
import urls from "../../constants/urls";

export const signup = (name, email, password, profilePic) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(urls.server + "user/signup", {
        name,
        email,
        password,
      });

      if (response.status != 201) console.log(response);

      // store user data in async storage
      await AsyncStorage.setItem(
        "@user",
        JSON.stringify({
          token: response.data.token,
          userId: response.data.userId,
        })
      );

      // dispatch login to store
      dispatch({
        type: SIGNUP,
        payload: response.data,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(urls.server + "user/login", {
        email,
        password,
      });

      if (response.status != 200) throw new Error("Login failed");

      // store user data in async storage
      await AsyncStorage.setItem(
        "@user",
        JSON.stringify({
          token: response.data.token,
          userId: response.data.userId,
        })
      );

      // store login data in store
      dispatch({
        type: LOGIN,
        payload: response.data,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const autoLogin = (token, userId) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN,
      payload: { token, userId },
    });
  };
};

export const logout = () => {
  return async (dispatch) => {
    await AsyncStorage.removeItem("@user");
    dispatch({ type: LOGOUT });
  };
};
