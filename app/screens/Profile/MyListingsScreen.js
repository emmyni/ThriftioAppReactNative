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
    // retrieve favourite item ids from user section of database
    let favourites = [];
    firebase
      .database()
      .ref("users/" + userId + "/favourite_items")
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          favourites = snapshot.val();

          // get favItems information from the items part of database
          let favItems = {};

          const ref = firebase.database().ref("items");
          favourites.map((fav) => {
            ref
              .orderByKey()
              .equalTo(fav)
              .once("value")
              .then((snapshot) => {
                if (snapshot.val()) {
                  favItems[fav] = snapshot.val()[fav];
                  if (Object.keys(favItems).length == favourites.length)
                    setItems(favItems);
                }
              });
          });
        }
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
