import React, { useReducer } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Headline } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import TextInputWrapper from "../../components/shared/TextInputWrapper";
import { signup as signupAction } from "../../redux/actions/authActions";

// TODO: ERROR CATCHING + check password match
// initial state reducer for login form
const signupInitialState = {
  inputValues: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "student",
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
  return (
    <SafeAreaView style={styles.screen}>
      <Headline>Create your account</Headline>
      <View style={styles.signup}>
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
        <TextInputWrapper
          id="confirmPassword"
          label="Confirm Password"
          mode="outlined"
          autoCapitalize="none"
          secureTextEntry={true}
          value={signupState.inputValues.confirmPassword}
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
