import React, { useEffect, useState } from "react";
import { StyleSheet, RefreshControl } from "react-native";
import {
  Container,
  Header,
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
import colors from "../../config/colors";

const MessagesScreen = ({ navigation }) => {
  const currentUser = firebase.auth().currentUser;
  const [chats, setChats] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    firebase
      .database()
      .ref("/users/" + currentUser.uid + "/messages")
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          setChats(snapshot.val());
        }
      });
    setRefreshing(false);
  };

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Messages</Title>
        </Body>
        <Right />
      </Header>
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
