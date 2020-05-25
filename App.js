import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import { useDeviceOrientation } from "@react-native-community/hooks";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import ViewImageScreen from "./app/screens/ViewImageScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="ViewImageScreen" component={ViewImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
