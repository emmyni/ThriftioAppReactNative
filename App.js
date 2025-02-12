import "react-native-gesture-handler";
import React from "react";
import { useDeviceOrientation } from "@react-native-community/hooks";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase";
import { firebaseConfig } from "./firebaseConfig";

import colors from "./app/config/colors";
import appDetails from "./app/config/appDetails";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import ViewImageScreen from "./app/screens/ViewImageScreen";
import LoginScreen from "./app/screens/LoginScreen";
import SignupScreen from "./app/screens/SignupScreen";
import FeedScreen from "./app/screens/FeedScreen";
import ListingInfoScreen from "./app/screens/ListingInfoScreen";
import AddListingScreen from "./app/screens/AddListingScreen";
import OtherUserScreen from "./app/screens/OtherUserScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import MyListingsScreen from "./app/screens/Profile/MyListingsScreen";
import MessagesScreen from "./app/screens/Profile/MessagesScreen";
import ChatScreen from "./app/screens/Profile/ChatScreen";

firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: appDetails.title,
          headerBackTitle: "Back",
          headerShown: false,
        }}
      >
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="ViewImageScreen" component={ViewImageScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="FeedScreen" component={FeedScreen} />
        <Stack.Screen name="ListingInfoScreen" component={ListingInfoScreen} />
        <Stack.Screen name="AddListingScreen" component={AddListingScreen} />
        <Stack.Screen name="OtherUserScreen" component={OtherUserScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="MyListingsScreen" component={MyListingsScreen} />
        <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
