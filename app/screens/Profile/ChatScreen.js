import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "firebase";
import uuid from "uuid-random";
import moment from "moment";

export default function ChatScreen({ route }) {
  const [messages, setMessages] = useState([]);

  const { itemId } = route.params;
  const currentUser = firebase.auth().currentUser;
  const currentUserDetails = {
    _id: currentUser.uid,
    name: currentUser.displayName,
    avatar:
      currentUser.photoURL ||
      "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg",
  };

  useEffect(() => {
    firebase
      .database()
      .ref("/chats/" + itemId + "/messages")
      .orderByChild("createdAt")
      .limitToLast(100)
      .on("value", (snapshot) => {
        setMessages(snapshot.val().reverse());
      });
  }, []);

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
      .ref("/chats/" + itemId)
      .update({
        messages: [...messages, newMessage[0]],
      });
  };

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
