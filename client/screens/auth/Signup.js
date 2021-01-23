import React, { useReducer } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Headline } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";

import TextInputWrapper from "../../components/shared/TextInputWrapper";
import { signup as signupAction } from "../../redux/actions/authActions";

// initial state reducer for login form
const signupInitialState = {
  inputValues: {
    name: "",
    email: "",
    password: "",
    profilePic: null,
  },
};
const signupReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };

      return { ...state, inputValues: updatedValues };
    default:
      return state;
  }
};

const signup = () => {
  // set up reducer
  const [signupState, dispatchSignupForm] = useReducer(
    signupReducer,
    signupInitialState
  );

  const dispatch = useDispatch();

  // handler for any change in form inputs
  const inputChangeHandler = (input, value) => {
    dispatchSignupForm({ type: "UPDATE", input, value });
  };

  // select photo
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required.");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
    if (pickerResult.cancelled) {
      return;
    }

    let localUri = pickerResult.uri;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    inputChangeHandler("profilePic", { uri: localUri, name: filename, type });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Headline>Create your account</Headline>
      <View style={styles.signup}>
        <Avatar.Image
          size={125}
          style={{ alignSelf: "center", marginBottom: 20 }}
          onTouchEnd={pickImage}
          source={{
            uri: signupState.inputValues.profilePic
              ? signupState.inputValues.profilePic.uri
              : "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
          }}
        />
        <TextInputWrapper
          id="name"
          label="Name"
          mode="outlined"
          value={signupState.inputValues.name}
          onInputChange={inputChangeHandler}
        />
        <TextInputWrapper
          id="email"
          label="Email"
          mode="outlined"
          autoCapitalize="none"
          value={signupState.inputValues.email}
          onInputChange={inputChangeHandler}
        />
        <TextInputWrapper
          id="password"
          label="Password"
          mode="outlined"
          autoCapitalize="none"
          secureTextEntry={true}
          value={signupState.inputValues.password}
          onInputChange={inputChangeHandler}
        />
      </View>

      <View style={styles.buttons}>
        <Button
          mode="contained"
          onPress={() => {
            dispatch(
              signupAction(
                signupState.inputValues.name,
                signupState.inputValues.email,
                signupState.inputValues.password,
                signupState.inputValues.type
              )
            );
          }}
        >
          Signup
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default signup;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  signup: {
    paddingVertical: 10,
  },
  typeSelection: {
    width: "100%",
    justifyContent: "space-evenly",
  },
  type: {
    alignItems: "center",
  },
});
