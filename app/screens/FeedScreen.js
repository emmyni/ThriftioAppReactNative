import React from "react";
import { StyleSheet } from "react-native";
import { Container, Content } from "native-base";
import SearchBar from "./SearchBar";
import TagsList from "./components/TagsList";

import Listing from "./components/Listing";
import NavigationMenu from "./common/NavigationMenu";

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
      <NavigationMenu navigation={navigation} />
    </Container>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({});
