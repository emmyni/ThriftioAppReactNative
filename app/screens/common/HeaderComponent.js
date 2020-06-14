import React from "react";
import { StyleSheet } from "react-native";
import { Header, Left, Button, Icon, Body, Text, Right } from "native-base";

export default function HeaderComponent({ navigation, title }) {
  return (
    <Header>
      <Left>
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Text style={{ fontWeight: "bold" }}>{title}</Text>
      </Body>
      <Right />
    </Header>
  );
}

const styles = StyleSheet.create({});
