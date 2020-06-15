import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem, Left, Body, Right, Thumbnail, Text } from "native-base";
import firebase from "firebase";
import moment from "moment";

export default function Chat({ navigation, chat }) {
  const itemId = chat.itemId;
  const itemName = chat.itemName;
  const otherUserId = chat.userId;
  const [otherUser, setOtherUser] = useState({});
  const [messages, setMessages] = useState({});

  useEffect(() => {
    firebase
      .database()
      .ref("/users/" + otherUserId)
      .once("value")
      .then((snapshot) => {
        setOtherUser(snapshot.val());
      });

    firebase
      .database()
      .ref("/chats/" + itemId + "/messages")
      .orderByChild("createdAt")
      .limitToLast(1)
      .once("value")
      .then((snapshot) => {
        const data = snapshot.val();
        const message = data[Object.keys(data)[0]];
        setMessages(message);
      });
  }, []);

  if (messages) {
    return (
      <ListItem
        avatar
        button
        onPress={() => {
          navigation.navigate("ChatScreen", {
            itemId: itemId,
            itemName: itemName,
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
            {messages.text}
          </Text>
          <Text></Text>
        </Body>
        <Right>
          <Text note>{moment(messages.createdAt).fromNow()}</Text>
        </Right>
      </ListItem>
    );
  } else {
    return <ListItem></ListItem>;
  }
}

const styles = StyleSheet.create({});
