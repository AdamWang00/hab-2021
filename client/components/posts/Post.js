import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Card,
  Divider,
  Title,
  Text,
  Subheading,
  Chip,
} from "react-native-paper";

const Post = (props) => {
  return (
    <View>
      <Card>
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: 5,
            }}
          >
            <Avatar.Image
              source={{ uri: props.post.user_image_url }}
              size={25}
            />
            <Title style={{ marginLeft: 10 }}>Name</Title>
            <Chip style={{ marginLeft: 10 }}>{props.post.type}</Chip>
          </View>
          <Divider />
          <View style={{ paddingVertical: 10 }}>
            <Text>{props.post.text}</Text>
          </View>

          <Divider />
          <Subheading>{props.post.numReplies} Replies</Subheading>
        </Card.Content>
      </Card>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({});
