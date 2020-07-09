import React, { useEffect, useState } from "react";
import { StyleSheet, RefreshControl } from "react-native";
import { Container, Content, List } from "native-base";
import firebase from "firebase";

import Chat from "../components/Chat";
import Header from "../common/HeaderComponent";

const MessagesScreen = ({ navigation }) => {
  const currentUser = firebase.auth().currentUser;
  const [chats, setChats] = useState([]);

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
          }
        }
      });
  };

  return (
    <Container>
      <Header navigation={navigation} title="Messages" />
      <Content Content>
        <List>
          {chats &&
            Object.keys(chats).map((key) => {
              return (
                <Chat key={key} chat={chats[key]} navigation={navigation} />
              );
            })}
        </List>
      </Content>
    </Container>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({});
