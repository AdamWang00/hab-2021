import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Feed from "../screens/Feed";

const FeedStack = createStackNavigator();

const FeedNavigator = () => {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen name="Feed" component={Feed} />
    </FeedStack.Navigator>
  );
};

export default FeedNavigator;
