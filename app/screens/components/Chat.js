import React from "react";
import { StyleSheet } from "react-native";
import { ListItem, Left, Body, Right, Thumbnail, Text } from "native-base";

export default function Chat({ navigation }) {
  return (
    <ListItem
      avatar
      button
      onPress={() => {
        navigation.navigate("ChatScreen");
      }}
    >
      <Left>
        <Thumbnail source={{ uri: "Image URL" }} />
      </Left>
      <Body>
        <Text>Kumar Pratik</Text>
        <Text note>Doing what you like will always keep you happy . .</Text>
      </Body>
      <Right>
        <Text note>3:43 pm</Text>
      </Right>
    </ListItem>
  );
}

const styles = StyleSheet.create({});
