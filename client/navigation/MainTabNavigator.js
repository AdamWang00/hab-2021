import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Feed from "./FeedNavigator";
import Create from "./CreateNavigator";
import Activity from "./ActivityNavigator";
import Profile from "./ProfileNavigator";

const MainTab = createMaterialBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      initialRouteName="Feed"
      barStyle={{ backgroundColor: "#FF6B00" }}
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      shifting={false}>
      <MainTab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="rss" color={color} size={26} />
          ),
        }}
      />
      <MainTab.Screen
        name="Create"
        component={Create}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="pencil" color={color} size={26} />
          ),
        }}
      />
      <MainTab.Screen
        name="Activity"
        component={Activity}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
