import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import AuthNavigator from "./AuthNavigator";
import MainNavigator from "../MainNavigator";

const EntryNavigator = () => {
  const userId = true; //useSelector((state) => state.auth.userId);
  return <>{userId ? <MainNavigator /> : <AuthNavigator />}</>;
};

export default EntryNavigator;

const styles = StyleSheet.create({});
