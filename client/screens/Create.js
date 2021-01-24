import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Button, TextInput, RadioButton } from "react-native-paper";
import { useSelector } from "react-redux";
const Create = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [type, setType] = useState("");

  const userId = useSelector((state) => state.auth.userId);

  const submit = () => {
    const body = { title, text, type, userId };

    //TODO: send request
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <TextInput
        label="Title"
        style={{ marginBottom: 20 }}
        value={title}
        onChangeText={(value) => {
          setTitle(value);
        }}
      />
      <TextInput
        label="Text"
        style={{ marginBottom: 20 }}
        multiline
        numberOfLines={10}
        value={text}
        onChangeText={(value) => {
          setText(value);
        }}
      />
      <RadioButton.Group
        style={{ marginBottom: 20 }}
        onValueChange={(value) => setType(value)}
        value={type}
      >
        <RadioButton.Item label="Post" value="post" />
        <RadioButton.Item label="Plan" value="plan" />
        <RadioButton.Item label="Memory" value="memory" />
      </RadioButton.Group>

      <Button onPress={submit}>Create</Button>
    </ScrollView>
  );
};

export default Create;

const styles = StyleSheet.create({});
