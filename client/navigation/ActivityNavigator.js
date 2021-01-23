import { createStackNavigator } from "@react-navigation/stack";

import Activity from "../screens/Activity";

const ActivityStack = createStackNavigator();

const ActivityNavigator = () => {
  return (
    <ActivityStack.Navigator>
      <ActivityStack.Screen name="Activity" component={Activity} />
    </ActivityStack.Navigator>
  );
};

export default ActivityNavigator;
