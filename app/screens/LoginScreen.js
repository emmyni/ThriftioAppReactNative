import React, { useState } from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";
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

import colors from "../config/colors";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
      <Content>
        <Form>
          <Item floatingLabel>
            <Icon active name="person" />
            <Label>Username</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Icon active name="lock" />
            <Label>Password</Label>
            <Input />
          </Item>
        </Form>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
  },
  container: {
    backgroundColor: colors.white,
    justifyContent: "space-around",
    paddingHorizontal: "10%",
    flex: 0.25,
  },
  passwordTextInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 6,
  },
  textInputContainer: {},
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  usernameTextInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 6,
  },
});

export default LoginScreen;
