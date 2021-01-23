import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

import EntryNavigator from "./navigation/entry/EntryNavigator";
import store from "./redux/store";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    // TODO: add custom colors here
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <EntryNavigator />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
