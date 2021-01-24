import axios from "axios";
import React, { useReducer, useState } from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Avatar, Button, Divider, IconButton, Title } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/actions/authActions";
import Loading from "./shared/Loading";

// initial state reducer for user details
const profileInitialState = {
  isLoaded: false,
  values: { name: "", email: "", profilePicUrl: "", connections: [] },
};
const profileReducer = (state, action) => {
  return { ...state, values: action.values, isLoaded: true };
};

const Profile = (props) => {
  // is owner
  const [isOwner, setIsOwner] = useState(true);

  // set up reducer
  const [profileState, dispatchProfile] = useReducer(
    profileReducer,
    profileInitialState
  );

  // get token + userId
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  const pageUserId = props.route.params ? props.route.params.userId : null;

  // load details TODO: error catching
  useEffect(() => {
    const loadDetails = async () => {
      let reqUserId;

      if (pageUserId !== userId) {
        // user does not own the profile page
        setIsOwner(false);
        reqUserId = pageUserId;
      } else {
        // user is owner
        setIsOwner(true);
        reqUserId = userId;
      }

      const response = {
        data: {
          name: "Sample User",
          email: "sample@email.com",
          connections: [
            {
              id: 1,
              name: "person a",
              image_url:
                "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
            },
            {
              id: 2,
              name: "person b",
              image_url:
                "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
            },
            {
              id: 1,
              name: "person c",
              image_url:
                "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
            },
          ],
        },
      }; // DUMMY RESPONSE
      /* TODO: CALL BACKEND
      await axios.get(urls.server + "user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      */

      dispatchProfile({
        values: {
          name: response.data.name,
          email: response.data.email,
          profilePicUrl: response.data.profilePic
            ? response.data.profilePic.url
            : "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
          connections: response.data.connections,
        },
      });
    };
    loadDetails();
  }, []);

  const dispatch = useDispatch();

  // check if loading
  if (!profileState.isLoaded) {
    return <Loading />;
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Avatar.Image
        size={125}
        source={{ uri: profileState.values.profilePicUrl }}
      />
      <View style={styles.info}>
        <View style={styles.infoSection}>
          <IconButton icon="account-circle" />
          <Text>{profileState.values.name}</Text>
        </View>
        <Divider />
        <View style={styles.infoSection}>
          <IconButton icon="email" />
          <Text>{profileState.values.email}</Text>
        </View>
        <Divider />
        <View style={styles.infoSection}></View>
        <Divider />
      </View>

      {isOwner && (
        <View style={{ width: "100%" }}>
          <Text>{isOwner.toString()}</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Title>Contacts</Title>
            <IconButton icon="plus-circle" />
          </View>
          <Divider />
          {profileState.values.connections.map((connection) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Avatar.Image
                source={{ uri: connection.image_url }}
                size={32}
                style={{ marginRight: 10 }}
              />
              <Title>{connection.name}</Title>
            </View>
          ))}
          <View style={styles.actions}>
            <Button
              icon="logout"
              onPress={() => {
                dispatch(logout());
              }}
            >
              Logout
            </Button>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", padding: 20 },
  info: { paddingVertical: 20, width: "100%" },
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actions: { marginTop: 10 },
});
