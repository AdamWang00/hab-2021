import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

const TextInputWrapper = (props) => {
  return (
    <View>
      <TextInput
        {...props}
        onChangeText={(value) => {
          props.onInputChange(props.id, value);
        }}
      />
    </View>
  );
};

export default TextInputWrapper;
