import React, { useState, useEffect } from "react";
import { StyleSheet, Alert, View } from "react-native";
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from "native-base";
import firebase from "firebase";

import colors from "../../config/colors";

export default function MessageListingInfo({
  id,
  item,
  images,
  isMine,
  navigation,
}) {
  const [sold, setSold] = useState(false);

  useEffect(() => {
    setSold(item.sold);
  });

  const markSold = () => {
    Alert.alert(
      "Confirm",
      `Are you sure you want to mark ${item.item_name} as sold?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            firebase
              .database()
              .ref("/items/" + id)
              .update({
                sold: sold,
              });
            setSold(true);
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <Card>
      <CardItem>
        <Left>
          <Thumbnail source={{ uri: images[0] }} />
          <Body>
            <Text>{item.item_name}</Text>
            <Text note>{item.desc}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody></CardItem>
      <CardItem style={styles.buttonContainer}>
        <View>
          <Button
            style={styles.button}
            onPress={() =>
              navigation.navigate("ListingInfoScreen", {
                images: images,
                item: item,
                id: id,
              })
            }
          >
            <Icon active name="chatbubbles" />
            <Text>View Listing</Text>
          </Button>
        </View>
        <View>
          <Button
            style={sold ? styles.buttonPressed : styles.button}
            onPress={() => markSold()}
          >
            <Icon active name="thumbs-up" />
            <Text>
              {isMine ? (sold ? "Sold" : "Mark Sold") : "Rate Seller"}
            </Text>
          </Button>
        </View>
      </CardItem>
    </Card>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
  },
  buttonContainer: {
    justifyContent: "space-around",
  },
  buttonPressed: {
    backgroundColor: colors.secondary,
  },
});
