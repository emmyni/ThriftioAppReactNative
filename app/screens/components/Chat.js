import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem, Left, Body, Right, Thumbnail, Text } from "native-base";
import firebase from "firebase";
import moment from "moment";

export default function Chat({ navigation, chat }) {
  const chatId = chat.chatId;
  const otherUserId = chat.userId;
  const [otherUser, setOtherUser] = useState({});
  const [messages, setMessages] = useState([]);

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
      .ref("/messages/" + chatId + "/messages")
      .once("value")
      .then((snapshot) => {
        setMessages(snapshot.val());
      });
  }, []);

  if (messages[0]) {
    return (
      <ListItem
        avatar
        button
        onPress={() => {
          navigation.navigate("ChatScreen", { messages: messages });
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
          <Text>
            {otherUser.first_name + " " + otherUser.last_name ||
              otherUser.email}
          </Text>
          <Text numberOfLines={2} note>
            {messages[0].text}
          </Text>
          <Text></Text>
        </Body>
        <Right>
          <Text note>{moment(messages[0].createdAt).fromNow()}</Text>
        </Right>
      </ListItem>
    );
  } else {
    return <ListItem></ListItem>;
  }
}

const styles = StyleSheet.create({});
