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

import BackgroundGradient from "./common/BackgroundGradient";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
                <Label>Username</Label>
                <Input onChangeText={(text) => setUsername(text)} />
              </Item>
              <Item floatingLabel last>
                <Icon active name="lock" />
                <Label>Password</Label>
                <Input onChangeText={(text) => setPassword(text)} />
              </Item>
            </Form>
            <View style={styles.button}>
              <Button block light>
                <Text>Login</Text>
              </Button>
            </View>
          </View>
          <View style={styles.signupButton}>
            <Button transparent>
              <Text>Don't have an account? </Text>
            </Button>
            <Button
              transparent
              light
              onPress={() => navigation.navigate("SignupScreen")}
            >
              <Text>Sign Up</Text>
            </Button>
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
