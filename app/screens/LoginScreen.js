import React, { useState } from "react";
import { StyleSheet, Image, Text, View, Dimensions } from "react-native";
import {
  Container,
  Content,
  Grid,
  Col,
  Row,
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
    <Container style={styles.background}>
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
            <Button block light>
              <Text>Login</Text>
            </Button>
          </View>
        </View>
      </Content>
    </Container>
  );
};

const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.primary,
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
});

export default LoginScreen;
