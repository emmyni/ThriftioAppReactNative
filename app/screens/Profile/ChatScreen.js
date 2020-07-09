import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "firebase";
import uuid from "uuid-random";
import moment from "moment";

import Header from "../common/HeaderComponent";
import MessageListingInfo from "../components/MessageListingInfo";
import colors from "../../config/colors";

export default function ChatScreen({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const [item, setItem] = useState({});
  const [images, setImages] = useState([]);

  const { chat } = route.params;
  const itemId = chat.itemId;
  const itemName = chat.itemName;
  const owner = chat.owner;
  const { otherUser } = route.params;
  const { refresh } = route.params;

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
        let ordered = [];
        snapshot.forEach((mes) => {
          ordered.push(mes.val());
        });
        setMessages(ordered.reverse());
      });
    firebase
      .database()
      .ref("/items/" + itemId)
      .once("value")
      .then((snapshot) => {
        setItem(snapshot.val());
      });

    // Create a reference under which you want to list
    let listRef = firebase
      .storage()
      .ref()
      .child(owner + "/" + itemId);

    // Find all the prefixes and items.
    listRef
      .listAll()
      .then((res) => {
        const result = [];
        res.items.forEach((itemRef) => {
          itemRef.getDownloadURL().then((url) => {
            result.push(url);
            setImages(result);
          });
        });
      })
      .catch((error) => {
        console.log(error);
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

    newMessage[0].createdAt = new Date().getTime();

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
      <Header
        navigation={navigation}
        title={
          otherUser.first_name + " " + otherUser.last_name || otherUser.email
        }
        subtitle={itemName}
        refresh={refresh}
      />
      <MessageListingInfo
        id={itemId}
        item={item}
        images={images}
        isMine={currentUser.uid === owner ? true : false}
        navigation={navigation}
      />
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
    backgroundColor: colors.white,
  },
});
