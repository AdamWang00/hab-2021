import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import AuthNavigator from "./AuthNavigator";

const EntryNavigator = () => {
  const userId = useSelector((state) => state.auth.userId);
  return <>{userId ? <MainNavigator /> : <AuthNavigator />}</>;
};

export default EntryNavigator;

const styles = StyleSheet.create({});
