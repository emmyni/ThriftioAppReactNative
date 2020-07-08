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
import { color } from "react-native-reanimated";

export default function MessageListingInfo({
  id,
  item,
  images,
  isMine,
  navigation,
}) {
  const [sold, setSold] = useState(0);
  const [marked, setMarked] = useState(false);
  useEffect(() => {
    if (!marked) setSold(item.sold);
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
                sold: 1,
              });
            setMarked(true);
            setSold(1);
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
            <Icon active name="information-circle" />
            <Text>View Listing</Text>
          </Button>
        </View>
        <View>
          <Button
            style={sold ? styles.buttonSoldPressed : styles.buttonSold}
            onPress={() => markSold()}
            disabled={sold ? true : false}
          >
            <Icon active name="checkmark-circle" style={styles.icon} />
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
  buttonSold: {
    backgroundColor: colors.secondary,
  },
  buttonSoldPressed: {
    backgroundColor: colors.secondaryFaded,
  },
  icon: {
    color: colors.white,
  },
});
