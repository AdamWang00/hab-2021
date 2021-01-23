import React, { useState, useEffect } from "react";
import MainTabNavigator from "../MainTabNavigator";
import AuthNavigator from "./AuthNavigator";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { autoLogin } from "../../redux/actions/authActions";
import Loading from "../../screens/shared/Loading";

const EntryNavigator = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector((state) => state.auth.userId);

  // check for stored user
  useEffect(() => {
    const tryLogin = async () => {
      setIsLoading(true);

      // check if user data is stored
      const userData = await AsyncStorage.getItem("@user");

      if (userData) {
        const userDataJSON = JSON.parse(userData);
        dispatch(autoLogin(userDataJSON.token, userDataJSON.userId));
      }

      setIsLoading(false);
    };

    tryLogin();
  }, [userId]);

  // show loading screen if loading
  if (isLoading) {
    return <Loading />;
  }

  // return screens
  return <>{true ? <MainTabNavigator /> : <AuthNavigator />}</>;
};

export default EntryNavigator;
