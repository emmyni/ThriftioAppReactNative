import React, { useState } from "react";
import { StyleSheet, Image, Text, View, Dimensions } from "react-native";
import {
  Container,
  Content,
  Form,
  Icon,
  Item,
  Label,
  Input,
  Button,
} from "native-base";
import firebase from "firebase";

import BackgroundGradient from "./common/BackgroundGradient";

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");

  const signupUser = () => {
    try {
      if (password != password2) alert("Passwords don't match");
      else if (password.length < 6) alert("Please enter at least 6 characters");
      else firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container style={styles.background}>
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
                <Label>Username</Label>
                <Input onChangeText={(text) => setUsername(text)} />
              </Item>
              <Item floatingLabel>
                <Icon active name="mail" />
                <Label>Email</Label>
                <Input onChangeText={(text) => setEmail(text)} />
              </Item>
              <Item floatingLabel>
                <Icon active name="lock" />
                <Label>Password</Label>
                <Input
                  secureTextEntry={true}
                  onChangeText={(text) => setPassword(text)}
                />
              </Item>
              <Item floatingLabel last>
                <Icon active name="lock" />
                <Label>Re-enter Password</Label>
                <Input
                  secureTextEntry={true}
                  onChangeText={(text) => setPassword2(text)}
                />
              </Item>
            </Form>
            <View style={styles.button}>
              <Button block light onPress={() => signupUser()}>
                <Text>Sign Up</Text>
              </Button>
            </View>
            <View style={styles.loginButton}>
              <Button
                transparent
                onPress={() => navigation.navigate("LoginScreen")}
              >
                <Text>Already have an account? Login</Text>
              </Button>
            </View>
          </View>
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
  loginButton: {
    flexDirection: "row",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    alignSelf: "center",
  },
});

export default SignupScreen;
