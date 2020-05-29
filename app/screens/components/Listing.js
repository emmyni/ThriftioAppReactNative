import React, { useEffect, useState } from "react";
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
import PropTypes from "prop-types";
import firebase from "firebase";

const Listing = ({ navigation, item, id }) => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    // Create a reference under which you want to list
    const userId = firebase.auth().currentUser.uid;
    let listRef = firebase
      .storage()
      .ref()
      .child(userId + "/" + id);

    // Find all the prefixes and items.
    listRef
      .listAll()
      .then(function (res) {
        res.items.forEach(function (itemRef) {
          itemRef.getDownloadURL().then((url) => setImages([...images, url]));
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <TouchableOpacity onPress={() => navigation.navigate("ListingInfoScreen")}>
      <Card>
        <CardItem>
          <Image
            source={{ uri: images[0] }}
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
            <Text note>{item.created_at}</Text>
          </Right>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

Listing.propTypes = {
  item: PropTypes.object,
};

export default Listing;

const styles = StyleSheet.create({});
