import React from "react";
import { StyleSheet, View, Image } from "react-native";
import {
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";

const Listing = ({ navigation, item }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("ListingInfoScreen")}>
      <Card>
        <CardItem>
          <Image
            source={{ uri: "Image URL" }}
            style={{ height: 200, width: null, flex: 1 }}
          />
        </CardItem>
        <CardItem>
          <Left>
            <Body>
              <Text>{item.item_name}</Text>
              <Text note>{item.desc}</Text>
            </Body>
          </Left>
          <Right>
            <Text note>11h ago</Text>
          </Right>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

export default Listing;

const styles = StyleSheet.create({});
