import React, { useEffect, useState } from "react";
import { StyleSheet, RefreshControl } from "react-native";
import {
  Container,
  Content,
  List,
  Left,
  Body,
  Right,
  Icon,
  Button,
  Title,
} from "native-base";
import firebase from "firebase";

import Chat from "../components/Chat";
import Header from "../common/HeaderComponent";

import colors from "../../config/colors";

const MessagesScreen = ({ navigation }) => {
  const currentUser = firebase.auth().currentUser;
  const [chats, setChats] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    firebase
      .database()
      .ref("/users/" + currentUser.uid + "/messages")
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          if (snapshot.val() != chats) {
            setChats(snapshot.val());
            setRefreshing(true);
            setMessages([]);

            snapshot.val().forEach((chat) => {
              firebase
                .database()
                .ref("/chats/" + chat.itemId + "/messages")
                .orderByChild("createdAt")
                .limitToLast(1)
                .once("value")
                .then((snapshot) => {
                  const data = snapshot.val();
                  const message = data[Object.keys(data)[0]];
                  setMessages([...messages, message]);
                });
            });
          }
          setRefreshing(false);
        }
      });
  };

  return (
    <Container>
      <Header navigation={navigation} title="Messages" />
      <Content
        Content
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh.bind(this)}
            refreshing={refreshing}
            colors={[colors.primary]} //android
            tintColor={colors.primary} //ios
            progressBackgroundColor={colors.white}
          />
        }
      >
        <List>
          {chats &&
            messages &&
            Object.keys(chats).map((key) => {
              return (
                <Chat
                  key={key}
                  chat={chats[key]}
                  navigation={navigation}
                  message={messages[key]}
                />
              );
            })}
        </List>
      </Content>
    </Container>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({});
