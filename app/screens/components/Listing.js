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
import moment from "moment";

import colors from "../../config/colors";

const Listing = ({ navigation, item, id, refresh }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Create a reference under which you want to list
    const userId = item.user_id;
    let listRef = firebase
      .storage()
      .ref()
      .child(userId + "/" + id);

    // Find all the prefixes and items.
    listRef
      .listAll()
      .then((res) => {
        const result = [];
        res.items.forEach((itemRef) => {
          itemRef.getDownloadURL().then((url) => {
            result.push(url);
            setImages(result);
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log("here");
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ListingInfoScreen", {
          images: images,
          item: item,
          id: id,
          refresh: refresh,
        })
      }
    >
      <Card>
        <CardItem>
          <Image source={{ uri: images[0] }} style={styles.image} />
        </CardItem>
        <CardItem>
          <Left>
            <Body>
              <Text>{item.item_name}</Text>
              <Text style={styles.priceText}>${item.price}</Text>
            </Body>
          </Left>
          <Right>
            <Text note>{moment(item.created_at).fromNow()}</Text>
          </Right>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

Listing.propTypes = {
  item: PropTypes.object,
  id: PropTypes.string,
};

export default Listing;

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: null,
    flex: 1,
  },
  priceText: {
    color: colors.primary,
  },
});
