import React from "react";
import { StyleSheet } from "react-native";
import { Header, Item, Icon, Input } from "native-base";

const SearchBar = () => {
  return (
    <Header searchBar rounded>
      <Item>
        <Icon name="search" />
        <Input placeholder="Search" />
      </Item>
    </Header>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
