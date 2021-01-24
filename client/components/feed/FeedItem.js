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
        backgroundColor = "#ADD8E6";
        break;
      case "plan":
        backgroundColor = "#FED8B1";
        break;
      case "memory":
        backgroundColor = "#D0F0C0";
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
                  source={{ uri: props.item.userImageUrl }}
                  size={25}
                />
                <Subheading style={{ marginLeft: 10 }}>
                  {props.item.userName}
                </Subheading>
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
              {props.item.usersDetailed.map((user) => user.name)[0] +
                " and " +
                (props.item.usersDetailed.length - 1) +
                " other(s)"}
            </Caption>

            <Divider />
            <View style={{ paddingVertical: 10 }}>
              <Text>{props.item.text}</Text>
            </View>

            <Divider />
            <Text style={{ fontWeight: "bold" }}>
              {props.item.replies.length} Replies
            </Text>
          </Card.Content>
        </Card>
      </View>
    </Pressable>
  );
};

export default FeedItem;

const styles = StyleSheet.create({});
