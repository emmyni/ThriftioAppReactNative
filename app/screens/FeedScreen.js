import React, { useState, useEffect } from "react";
import { StyleSheet, RefreshControl, View } from "react-native";
import { Container, Content, Text } from "native-base";
import SearchBar from "./SearchBar";
import firebase from "firebase";

import colors from "../config/colors";

import TagsList from "./components/TagsList";
import Listing from "./components/Listing";
import NavigationMenu from "./common/NavigationMenu";

const FeedScreen = ({ navigation }) => {
  const [items, setItems] = useState({});
  const [properties, setProperties] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [filter, setFilter] = useState(false);
  const [filterCategory, setFilterCategory] = useState(0);
  const [noResult, setNoResult] = useState(false);

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    firebase
      .database()
      .ref("items")
      .orderByChild("created_at")
      .once("value")
      .then((snapshot) => {
        if (snapshot.val()) {
          setItems(snapshot.val());
          setProperties(Object.keys(snapshot.val()).reverse());
          setFilterCategory(0);
          setRefreshing(false);
          setNoResult(false);
        } else {
          setNoResult(true);
        }
      });
  };

  const searchTag = (id) => {
    if (!filter || filterCategory != id) {
      firebase
        .database()
        .ref("items")
        .orderByChild("category")
        .equalTo(id)
        .once("value")
        .then((snapshot) => {
          if (snapshot.val()) {
            setProperties(Object.keys(snapshot.val()).reverse());
            setNoResult(false);
          } else {
            setProperties([]);
            setNoResult(true);
          }
          setFilterCategory(id);
          setRefreshing(false);
        });
    } else {
      onRefresh();
    }
    setFilter(!filter);
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
            progressBackgroundColor={colors.white}
          />
        }
      >
        <TagsList searchTag={searchTag} />
        {items &&
          !noResult &&
          properties.map((key) => {
            return (
              <Listing
                key={key}
                id={key}
                item={items[key]}
                navigation={navigation}
              />
            );
          })}
        {noResult && (
          <View style={styles.noResult}>
            <Text style={{ margin: 20 }}>No Results Found</Text>
          </View>
        )}
      </Content>
      <NavigationMenu navigation={navigation} />
    </Container>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  noResult: {},
});
