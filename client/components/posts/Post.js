import React from "react";
import { StyleSheet, Text, View, Title, Paragraph } from "react-native";
import { Card } from "react-native-paper";

const Post = (props) => {
  return (
    <View>
      <Card>
        <Card.Title title="This is a post" subtitle="subtitle" />
      </Card>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({});
