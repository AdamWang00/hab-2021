import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import EntryNavigator from "./navigation/entry/EntryNavigator";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <EntryNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
