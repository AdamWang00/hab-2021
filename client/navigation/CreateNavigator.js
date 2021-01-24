import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Create from "../screens/Create";

const CreateStack = createStackNavigator();

const CreateNavigator = () => {
  return (
    <CreateStack.Navigator>
      <CreateStack.Screen name="Create" component={Create} />
    </CreateStack.Navigator>
  );
};

export default CreateNavigator;
