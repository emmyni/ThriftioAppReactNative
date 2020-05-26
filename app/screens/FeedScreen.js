import React from "react";
import { StyleSheet } from "react-native";
import { Container, Content } from "native-base";
import SearchBar from "./SearchBar";
import TagsList from "./components/TagsList";

import Listing from "./Listing";

const FeedScreen = ({ navigation }) => {
  return (
    <Container>
      <SearchBar />
      <Content padder>
        <TagsList />
        <Listing navigation={navigation} />
        <Listing navigation={navigation} />
        <Listing navigation={navigation} />
      </Content>
    </Container>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({});
