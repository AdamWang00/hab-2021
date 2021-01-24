import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Avatar,
  Title,
  Chip,
  Divider,
  Caption,
  Subheading,
  Button,
} from "react-native-paper";
import { useSelector } from "react-redux";

import Loading from "../shared/Loading";

const FeedItemDetails = (props) => {
  const { itemId } = props.route.params;
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const [itemDetails, setItemDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // determine color of chip
  const determineChipStyle = () => {
    let backgroundColor;
    switch (itemDetails.type) {
      case "post":
        backgroundColor = "#84B3F8";
        break;
      case "plan":
        backgroundColor = "FF9E58";
        break;
      case "memory":
        backgroundColor = "#4FD000";
        break;
    }
    return { backgroundColor };
  };

  useEffect(() => {
    const loadDetails = async () => {
      setIsLoading(true);
      const response = {
        data: {
          type: "post",
          user_id: 1,
          user_name: "Name",
          user_image_url:
            "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
          text:
            "text text text text text text text text text text text text text text text text text text text text text text text text text text text",
          users: [{ name: "Person A" }, { name: "Person B" }],
          replies: [
            {
              user_name: "Person A",
              user_image_url:
                "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
              text: "sounds good!",
            },
            {
              user_name: "Person A",
              user_image_url:
                "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
              text: "hello",
            },
            {
              user_name: "Person A",
              user_image_url:
                "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
              text: "hello",
            },
            {
              user_name: "Person A",
              user_image_url:
                "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
              text: "hello",
            },
          ],
        },
        status: 200,
      };
      /* TODO: FETCH DATA FROM BACKEND
      await axios.get(urls.server + `post/${listingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }); 
*/
      if (response.status == 200) {
        setItemDetails(response.data);
      } else {
        throw new Error(response.data.message);
      }
      setIsLoading(false);
    };

    loadDetails();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.screen}>
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
            source={{ uri: itemDetails.user_image_url }}
            size={25}
          />
          <Title style={{ marginLeft: 10 }}>{itemDetails.user_name}</Title>
        </View>
        <View>
          <Chip
            textStyle={{ textTransform: "capitalize" }}
            style={determineChipStyle()}
          >
            {itemDetails.type}
          </Chip>
        </View>
      </View>
      <Divider />
      <Caption>{itemDetails.users.map((user) => user.name).join(", ")}</Caption>

      <Divider />
      <View style={{ paddingVertical: 10 }}>
        <Text>{itemDetails.text}</Text>
      </View>
      {userId === itemDetails.user_id && (
        <Button size="small">Convert to Memory</Button>
      )}
      <Divider />
      <Subheading style={{ fontWeight: "bold", paddingVertical: 5 }}>
        {itemDetails.replies.length} Replies
      </Subheading>
      {itemDetails.replies.map((reply) => (
        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Avatar.Image size={30} source={{ uri: reply.user_image_url }} />
          <Text style={{ fontWeight: "bold", marginLeft: 5, marginRight: 5 }}>
            {reply.user_name}:
          </Text>
          <Text>{reply.text}</Text>
        </View>
      ))}
    </View>
  );
};

export default FeedItemDetails;

const styles = StyleSheet.create({
  screen: { padding: 20 },
});
