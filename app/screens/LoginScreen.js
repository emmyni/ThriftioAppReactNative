import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View, Dimensions } from "react-native";
import {
  Container,
  Content,
  Form,
  Icon,
  Item,
  Label,
  Input,
  Button,
  Text,
} from "native-base";
import firebase from "firebase";

import BackgroundGradient from "./common/BackgroundGradient";
import LoginExternal from "./LoginExternal";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const loginUser = () => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <BackgroundGradient />
      <Content>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../assets/logo-red.png")}
            />
          </View>
          <View>
            <Form>
              <Item floatingLabel>
                <Icon active name="person" />
                <Label>Email</Label>
                <Input onChangeText={(text) => setEmail(text)} />
              </Item>
              <Item floatingLabel last>
                <Icon active name="lock" />
                <Label>Password</Label>
                <Input
                  secureTextEntry={true}
                  onChangeText={(text) => setPassword(text)}
                />
              </Item>
            </Form>
            <View style={styles.button}>
              <Button block light onPress={() => loginUser()}>
                <Text>Login</Text>
              </Button>
            </View>
          </View>
          <View style={styles.signupButton}>
            <Button
              transparent
              onPress={() => navigation.navigate("SignupScreen")}
            >
              <Text>Don't have an account? Sign Up</Text>
            </Button>
          </View>
          <LoginExternal navigation={navigation} />
        </View>
      </Content>
    </Container>
  );
};

const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  button: {
    paddingVertical: 30,
    paddingHorizontal: 5,
  },
  container: {
    flex: 1,
    height: height,
    width: width,
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    alignSelf: "center",
  },
  signupButton: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default LoginScreen;
