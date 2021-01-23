import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import AuthNavigator from "./AuthNavigator";
import MainTabNavigator from "../MainTabNavigator";

const EntryNavigator = () => {
  const userId = true; //useSelector((state) => state.auth.userId);
  return <>{userId ? <MainTabNavigator /> : <AuthNavigator />}</>;
};

export default EntryNavigator;
