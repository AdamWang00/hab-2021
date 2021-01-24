import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Feed from "../screens/feed/Feed";
import PostDetails from "../screens/feed/PostDetails";

const FeedStack = createStackNavigator();

const FeedNavigator = () => {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen name="Feed" component={Feed} />
      <FeedStack.Screen name="Post Details" component={PostDetails} />
    </FeedStack.Navigator>
  );
};

export default FeedNavigator;
