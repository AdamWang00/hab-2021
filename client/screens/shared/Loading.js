import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const Loading = () => {
  return (
    <View style={styles.screen}>
      <ActivityIndicator animating={true} size="large" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
});
