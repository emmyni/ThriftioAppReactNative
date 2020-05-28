import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Container, Content } from "native-base";
import SearchBar from "./SearchBar";
import firebase from "firebase";

import TagsList from "./components/TagsList";
import Listing from "./components/Listing";
import NavigationMenu from "./common/NavigationMenu";

const FeedScreen = ({ navigation }) => {
  const [items, setItems] = useState({});

  useEffect(() => {
    firebase
      .database()
      .ref("items")
      .orderByChild("item_name")
      .once("value", (snapshot) => {
        setItems(snapshot.val());
      });
  });

  return (
    <Container>
      <SearchBar />
      <Content padder>
        <TagsList />
        {Object.keys(items).map((key) => {
          return (
            <Listing key={key} item={items[key]} navigation={navigation} />
          );
        })}
        {/* <Listing navigation={navigation} />
        <Listing navigation={navigation} />
        <Listing navigation={navigation} /> */}
      </Content>
      <NavigationMenu navigation={navigation} />
    </Container>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({});
