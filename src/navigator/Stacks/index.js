import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login,  } from "../../containers";

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="Splash"
      component={Splash}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export { AuthStack };
