import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import { Button, TextInput, RadioButton } from "react-native-paper";
import { useSelector } from "react-redux";
import axios from "axios";
import urls from "../constants/urls";

const Create = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [type, setType] = useState("");

  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);

  const submit = async () => {
    const body = { title, text, type, userId };

    //TODO: send request
    const response = await axios.post(
      urls.server + "post",
      {
        type: "post",
        userId: "4790583889494016",
        userName: "Aubrey",
        userImageUrl: "url",
        text: "Enjoyed watching Tenet with the crew!",
        imageUrl: "iu",
        usersAdded: [
          { id: "5738709764800512", name: "John" },
          { id: "5139943911325696", name: "Susan" },
          { id: "4790583889494016", name: "Aubrey" },
          { id: "6206230007644160", name: "Albert" },
        ],
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(response);
    if (response.status === 200) {
      setTitle("");
      setText("");
      setType("");
    }
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
