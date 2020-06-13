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
  Right,
  Item,
  Input,
  Button,
  Form,
  Icon,
} from "native-base";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import PropTypes from "prop-types";
import firebase from "firebase";
import uuid from "uuid-random";
import moment from "moment";

import colors from "../config/colors";

import Maps from "./common/Maps";

const ListingInfo = ({ navigation, route }) => {
  const [message, setMessage] = useState("Is this still available?");
  const [itemUser, setItemUser] = useState({});
  const [numItems, setNumItems] = useState(1);
  const [isFavourite, setIsFavourite] = useState(false);
  const [favouriteListings, setFavouriteListings] = useState([]);
  const { images } = route.params;
  const { item } = route.params;
  const { id } = route.params;
  const currentUser = firebase.auth().currentUser;

  const [existingMessages, setExistingMessages] = useState([]);
  const [existingChatId, setExistingChatId] = useState("");

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

    // get existing favourite listings
    firebase
      .database()
      .ref("users/" + currentUser.uid + "/favourite_items")
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          setFavouriteListings(snapshot.val());
          if (snapshot.val().includes(id)) setIsFavourite(true);
        }
      });

    // get existing messages

    firebase
      .database()
      .ref("/users/" + currentUser.uid + "/messages")
      .orderByChild("userId")
      .equalTo(item.user_id)
      .once("value")
      .then((snapshot) => {
        if (snapshot.val()) {
          const chatId = snapshot.val()[0].chatId;
          setExistingChatId(chatId);
          firebase
            .database()
            .ref("/messages/" + chatId + "/messages")
            .once("value")
            .then((snapshot) => {
              if (snapshot.val()) {
                setExistingMessages(snapshot.val());
              }
            });
        }
      });
  }, []);

  const sendMessage = () => {
    let messageId = uuid();
    const giftedMessage = {
      _id: uuid(),
      text: message,
      createdAt: moment().format(),
      user: {
        _id: currentUser.uid,
        name: currentUser.displayName,
        avatar:
          itemUser.profile_picture ||
          "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg",
      },
    };

    if (existingChatId) {
      // create new message
      firebase
        .database()
        .ref("/messages/" + existingChatId)
        .update({
          messages: [...existingMessages, giftedMessage],
        });
    } else {
      // create new message
      firebase
        .database()
        .ref("/messages/" + messageId)
        .set({
          users: [currentUser.uid, item.user_id],
          messages: [giftedMessage],
        });

      // add new chat to messages section of users database
      firebase
        .database()
        .ref("/users/" + currentUser.uid)
        .update({
          messages: [{ chatId: messageId, userId: item.user_id }],
        });
    }
  };
  const favouriteListing = () => {
    if (isFavourite) {
      setFavouriteListings(favouriteListings.filter((curr) => curr != id));
      firebase
        .database()
        .ref("users/" + currentUser.uid)
        .update({
          favourite_items: favouriteListings.filter((curr) => curr != id),
        });
    } else {
      setFavouriteListings([...favouriteListings, id]);
      firebase
        .database()
        .ref("users/" + currentUser.uid)
        .update({
          favourite_items: [...favouriteListings, id],
        });
    }

    setIsFavourite(!isFavourite);
  };

  const isSameUser = item.user_id === currentUser.uid;

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
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate("ViewImageScreen", { image: image })
                    }
                  >
                    <Image source={{ uri: image }} style={styles.image} />
                  </TouchableOpacity>
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
            <Right>
              <Icon
                active
                name={isFavourite ? "star" : "star-outline"}
                style={styles.favouriteIcon}
                onPress={() => favouriteListing()}
              ></Icon>
            </Right>
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

ListingInfo.propTypes = {
  item: PropTypes.object,
  id: PropTypes.string,
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
  favouriteIcon: {
    color: colors.primary,
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
