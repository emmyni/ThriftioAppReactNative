import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "firebase";

export default function ChatScreen({ route }) {
  const messages = route.params;
  const currentUserId = firebase.auth().currentUser.uid;
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
      <GiftedChat messages={messages.messages} user={{ _id: currentUserId }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
