import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../screens/Profile";

const ProfileStack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
