import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Feed from "../screens/feed/Feed";
import FeedItemDetails from "../screens/feed/FeedItemDetails";

const FeedStack = createStackNavigator();

const FeedNavigator = () => {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen name="Feed" component={Feed} />
      <FeedStack.Screen name="Details" component={FeedItemDetails} />
    </FeedStack.Navigator>
  );
};

export default FeedNavigator;
