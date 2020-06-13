import React, { useState, useEffect } from "react";
import { StyleSheet, RefreshControl } from "react-native";
import { Container, Content } from "native-base";
import SearchBar from "./SearchBar";
import firebase from "firebase";

import colors from "../config/colors";

import TagsList from "./components/TagsList";
import Listing from "./components/Listing";
import NavigationMenu from "./common/NavigationMenu";

const FeedScreen = ({ navigation }) => {
  const [items, setItems] = useState({});
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    firebase
      .database()
      .ref("items")
      .orderByChild("item_name")
      .once("value")
      .then((snapshot) => {
        if (snapshot.val()) {
          setItems(snapshot.val());
          setRefreshing(false);
        }
      });
  }, []);

  const onRefresh = () => {
    firebase
      .database()
      .ref("items")
      .orderByChild("item_name")
      .once("value")
      .then((snapshot) => {
        if (snapshot.val()) {
          setItems(snapshot.val());
          setRefreshing(false);
        }
      });
  };

  return (
    <Container>
      <SearchBar />
      <Content
        padder
        Content
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh.bind(this)}
            refreshing={refreshing}
            colors={[colors.primary]} //android
            tintColor={colors.primary} //ios
            progressBackgroundColor={"#fff"}
          />
        }
      >
        <TagsList />
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
      <NavigationMenu navigation={navigation} />
    </Container>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({});
