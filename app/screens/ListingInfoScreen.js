import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import {
  View,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Item,
  Input,
  Button,
  Form,
  Icon,
} from "native-base";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";

import colors from "../config/colors";

import Maps from "./common/Maps";

const ListingInfo = ({ navigation, route }) => {
  const [message, setMessage] = useState("Is this still available?");
  const [itemUser, setItemUser] = useState({});
  const [numItems, setNumItems] = useState(1);
  const { images } = route.params;
  const { item } = route.params;

  useEffect(() => {
    // get listing user information
    firebase
      .database()
      .ref("users/" + item.user_id)
      .once("value")
      .then((snapshot) => {
        setItemUser(snapshot.val());
      });

    // get number of listings
    firebase
      .database()
      .ref("items")
      .orderByChild("user_id")
      .equalTo(item.user_id)
      .on("value", (snapshot) => {
        const num = Object.keys(snapshot.val()).length;
        setNumItems(num);
      });
  }, []);

  const sendMessage = () => {};
  const isSameUser = item.user_id === firebase.auth().currentUser.uid;

  return (
    <View style={styles.container}>
      <View style={styles.closeIcon}>
        <TouchableOpacity onPress={() => navigation.navigate("FeedScreen")}>
          <Icon active name="close-circle" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Card transparent>
          <CardItem cardBody>
            <ScrollView horizontal={true}>
              {images.map((image, index) => {
                return (
                  <Image
                    key={index}
                    source={{ uri: image }}
                    style={styles.image}
                  />
                );
              })}
            </ScrollView>
          </CardItem>

          <CardItem bordered>
            <Body>
              <Text>{item.item_name}</Text>
              <Text style={styles.priceText}>${item.price}</Text>
              <Text note>{item.desc}</Text>
            </Body>
          </CardItem>
          <CardItem bordered>
            <Left>
              <Thumbnail
                source={{
                  uri:
                    itemUser.profile_picture ||
                    "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg",
                }}
              />
              <Body>
                <Text>{itemUser.first_name + " " + itemUser.last_name}</Text>
                <Text note>
                  {numItems + (numItems === 1 ? " listing" : " listings")}
                </Text>
              </Body>
            </Left>
          </CardItem>
          {!isSameUser && (
            <Form style={styles.form}>
              <Item rounded style={styles.inputBox}>
                <Input onChangeText={(text) => setMessage(text)}>
                  <Text>{message}</Text>
                </Input>
              </Item>

              <Button rounded block onPress={() => sendMessage()}>
                <Text>Message Seller</Text>
              </Button>
            </Form>
          )}
        </Card>
        <Maps />
      </ScrollView>
    </View>
  );
};

export default ListingInfo;

const { height, width } = Dimensions.get("screen");
const styles = StyleSheet.create({
  closeIcon: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  form: {
    margin: 10,
    justifyContent: "center",
  },
  image: {
    height: height * 0.4,
    width: width,
    marginRight: 15,
    flex: 1,
  },
  inputBox: {
    marginBottom: 10,
  },
  priceText: {
    color: colors.primary,
  },
});
