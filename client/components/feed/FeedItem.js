import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import {
  Avatar,
  Card,
  Divider,
  Title,
  Text,
  Subheading,
  Chip,
  Caption,
} from "react-native-paper";

const FeedItem = (props) => {
  const determineChipStyle = () => {
    let backgroundColor;
    switch (props.item.type) {
      case "post":
        backgroundColor = "#84B3F8";
        break;
      case "plan":
        backgroundColor = "#FF9E58";
        break;
      case "memory":
        backgroundColor = "#4FD000";
        break;
    }
    return { backgroundColor };
  };

  return (
    <Pressable onPress={props.onPress}>
      <View>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: 5,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Avatar.Image
                  source={{ uri: props.item.user_image_url }}
                  size={25}
                />
                <Title style={{ marginLeft: 10 }}>{props.item.user_name}</Title>
              </View>
              <Chip
                textStyle={{ textTransform: "capitalize" }}
                style={determineChipStyle()}
              >
                {props.item.type}
              </Chip>
            </View>
            <Divider />

            <Caption>
              {props.item.users.map((user) => user.name).join(", ")}
            </Caption>

            <Divider />
            <View style={{ paddingVertical: 10 }}>
              <Text>{props.item.text}</Text>
            </View>

            <Divider />
            <Text style={{ fontWeight: "bold" }}>
              {props.item.numReplies} Replies
            </Text>
          </Card.Content>
        </Card>
      </View>
    </Pressable>
  );
};

export default FeedItem;

const styles = StyleSheet.create({});
