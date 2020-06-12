import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "firebase";
import uuid from "uuid-random";
import moment from "moment";

export default function ChatScreen({ route }) {
  const { messages } = route.params;
  const { chatId } = route.params;
  const currentUser = firebase.auth().currentUser;
  const currentUserDetails = {
    _id: currentUser.uid,
    name: currentUser.displayName,
    avatar:
      currentUser.photoURL ||
      "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg",
  };

  const sendMessage = (newMessage) => {
    const giftedMessage = {
      _id: uuid(),
      text: newMessage.text,
      createdAt: moment().format(),
      user: {
        _id: currentUser.uid,
        name:
          currentUser.first_name + " " + currentUser.last_name ||
          currentUser.email,
        avatar:
          currentUser.profile_picture ||
          "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg",
      },
    };

    // create new message
    firebase
      .database()
      .ref("/messages/" + chatId)
      .update({
        messages: [...messages, newMessage[0]],
      });

    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages),
    // }))
  };

  // const [messages, setMessages] = useState([
  //   {
  //     _id: 1,
  //     text: "Hello developer",
  //     createdAt: new Date(),
  //     user: {
  //       _id: 1,
  //       name: "React Native",
  //       avatar: "https://placeimg.com/140/140/any",
  //     },
  //   },
  //   {
  //     _id: 2,
  //     text: "Hello there",
  //     createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
  //     user: {
  //       _id: 2,
  //       name: "React Native",
  //       avatar: "https://placeimg.com/140/140/any",
  //     },
  //   },
  // ]);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        user={currentUserDetails}
        onSend={(newMessage) => sendMessage(newMessage)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
