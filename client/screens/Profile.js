import axios from "axios";
import React, { useReducer } from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Divider, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";

import Loading from "./shared/Loading";

// initial state reducer for user details
const profileInitialState = {
  isLoaded: false,
  values: { name: "", email: "", profilePicUrl: "" },
};
const profileReducer = (state, action) => {
  return { ...state, values: action.values, isLoaded: true };
};

const Profile = () => {
  // set up reducer
  const [profileState, dispatchProfile] = useReducer(
    profileReducer,
    profileInitialState
  );

  // get token
  const token = useSelector((state) => state.auth.token);

  // load details TODO: error catching
  useEffect(() => {
    const loadDetails = async () => {
      const response = {
        data: { name: "Sample User", email: "sample@email.com" },
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
    <View style={styles.screen}>
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

      <View style={styles.actions}>
        <Button icon="account-edit">Edit details</Button>
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
  actions: {},
});
