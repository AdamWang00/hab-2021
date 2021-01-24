import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";

const ActivityItem = (props) => {
  return (
    <Card>
      <Card.Title title={props.title} subtitle={props.text} />
    </Card>
  );
};

export default ActivityItem;
