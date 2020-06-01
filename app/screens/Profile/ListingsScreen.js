import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Content,
  Header,
  Body,
  Left,
  Right,
  Title,
  Button,
  Icon,
} from "native-base";
import firebase from "firebase";

import Listing from "../components/Listing";

const ListingsScreen = ({ navigation }) => {
  const [items, setItems] = useState({});

  useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("items")
      .orderByChild("user_id")
      .equalTo(userId)
      .on("value", (snapshot) => {
        if (snapshot.val()) setItems(snapshot.val());
      });
  }, []);

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>My Listings</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
        {items &&
          Object.keys(items).map((key) => {
            return (
              <Listing
                key={key}
                id={key}
                item={items[key]}
                navigation={navigation}
              />
            );
          })}
      </Content>
    </Container>
  );
};

export default ListingsScreen;

const styles = StyleSheet.create({});
