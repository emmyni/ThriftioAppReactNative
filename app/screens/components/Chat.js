import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem, Left, Body, Right, Thumbnail, Text } from "native-base";
import firebase from "firebase";
import moment from "moment";

export default function Chat({ navigation, chat, message }) {
  const itemId = chat.itemId;
  const itemName = chat.itemName;
  const otherUserId = chat.userId;
  const [otherUser, setOtherUser] = useState({});

  useEffect(() => {
    firebase
      .database()
      .ref("/users/" + otherUserId)
      .once("value")
      .then((snapshot) => {
        setOtherUser(snapshot.val());
      });
  }, []);

  if (message) {
    return (
      <ListItem
        avatar
        button
        onPress={() => {
          navigation.navigate("ChatScreen", {
            otherUser: otherUser,
            chat: chat,
          });
        }}
      >
        <Left>
          <Thumbnail
            source={{
              uri:
                otherUser.profile_picture ||
                "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg",
            }}
          />
        </Left>
        <Body>
          <Text numberOfLines={2}>
            {(otherUser.first_name + " " + otherUser.last_name ||
              otherUser.email) +
              " - " +
              itemName}
          </Text>
          <Text numberOfLines={2} note>
            {message.text}
          </Text>
          <Text></Text>
        </Body>
        <Right>
          <Text note>{moment(message.createdAt).fromNow()}</Text>
        </Right>
      </ListItem>
    );
  } else {
    return <ListItem></ListItem>;
  }
}

const styles = StyleSheet.create({});
