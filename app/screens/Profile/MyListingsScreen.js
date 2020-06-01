import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Content,
  Header,
  Body,
  Left,
  Right,
  Text,
  Button,
  Icon,
} from "native-base";
import firebase from "firebase";

import Listing from "../components/Listing";

const MyListingsScreen = ({ navigation, route }) => {
  const [items, setItems] = useState({});
  const { mine } = route.params;

  useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    mine ? getMyListings(userId) : getSavedListings(userId);
  }, []);

  const getMyListings = (userId) => {
    console.log("mine");
    firebase
      .database()
      .ref("items")
      .orderByChild("user_id")
      .equalTo(userId)
      .on("value", (snapshot) => {
        if (snapshot.val()) setItems(snapshot.val());
      });
  };
  const getSavedListings = (userId) => {
    console.log("saved");
    firebase
      .database()
      .ref("items")
      .orderByChild("user_id")
      .equalTo(userId)
      .once("value", (snapshot) => {
        setItems(snapshot.val());
      });
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
          <Text style={{ fontWeight: "bold" }}>
            {mine ? "My Listings" : "Saved Listings"}
          </Text>
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

export default MyListingsScreen;

const styles = StyleSheet.create({});
