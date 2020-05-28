import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Button,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";

import colors from "../config/colors";

const WelcomeScreen = ({ navigation }) => {
  const checkIfLogin = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("FeedScreen");
      }
    });
  };

  useEffect(() => {
    checkIfLogin();
  });

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo-red.png")} />
        <Text>Sell What You Don't Need</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.text}> Login </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate("SignupScreen")}
        >
          <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <Button
        title="Continue as Guest"
        onPress={() => navigation.navigate("FeedScreen")}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loginButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  registerButton: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    color: colors.white,
  },
});

export default WelcomeScreen;
