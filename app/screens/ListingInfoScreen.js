import React, { useState, useEffect, Fragment } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
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
  Toast,
  Root,
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
  const [sold, setSold] = useState(false);
  const [favouriteListings, setFavouriteListings] = useState([]);
  const { images } = route.params;
  const { item } = route.params;
  const { id } = route.params;
  const currentUser = firebase.auth().currentUser;

  const [existingMessages, setExistingMessages] = useState([]);

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
      .ref("/chats/" + id + "/messages")
      .once("value")
      .then((snapshot) => {
        if (snapshot.val()) {
          setExistingMessages(snapshot.val());
        }
      });

    //update sold status
    setSold(item.sold);
  }, []);

  const sendMessage = () => {
    const giftedMessage = {
      _id: uuid(),
      text: message,
      createdAt: new Date().getTime(),
      user: {
        _id: currentUser.uid,
        name: currentUser.displayName,
        avatar:
          itemUser.profile_picture ||
          "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg",
      },
    };
    if (existingMessages.length > 0) {
      // create new message
      firebase
        .database()
        .ref("/chats/" + id)
        .update({
          messages: [...existingMessages, giftedMessage],
        });
    } else {
      // create new message
      firebase
        .database()
        .ref("/chats/" + id)
        .set({
          users: [currentUser.uid, item.user_id],
          messages: [giftedMessage],
        });

      // add new chat to messages section of users database
      firebase
        .database()
        .ref("/users/" + currentUser.uid)
        .update({
          messages: [
            {
              itemId: id,
              itemName: item.item_name,
              userId: item.user_id,
              owner: item.user_id,
            },
          ],
        });

      firebase
        .database()
        .ref("/users/" + item.user_id)
        .update({
          messages: [
            {
              itemId: id,
              itemName: item.item_name,
              userId: currentUser.uid,
              owner: item.user_id,
            },
          ],
        });
    }

    Toast.show({
      text: "Message Sent",
      buttonText: "Okay",
      position: "top",
      duration: 3000,
      style: styles.toast,
    });
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
                sold: true,
              });
            setSold(true);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const isSameUser = item.user_id === currentUser.uid;

  return (
    <Root>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.container}>
          <View style={styles.closeIcon}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
                          navigation.navigate("ViewImageScreen", {
                            image: image,
                          })
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
                  {!isSameUser && (
                    <Icon
                      active
                      name={isFavourite ? "star" : "star-outline"}
                      style={styles.favouriteIcon}
                      onPress={() => favouriteListing()}
                    />
                  )}
                </Right>
              </CardItem>
              {!isSameUser && (
                <Fragment>
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
                        <Text>
                          {itemUser.first_name + " " + itemUser.last_name}
                        </Text>
                        <Text note>
                          {numItems +
                            (numItems === 1 ? " listing" : " listings")}
                        </Text>
                      </Body>
                    </Left>
                  </CardItem>
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
                </Fragment>
              )}
            </Card>
            {!isSameUser && <Maps />}
            {isSameUser && (
              <View style={{ justifyContent: "center" }}>
                <Button
                  rounded
                  block
                  onPress={() =>
                    navigation.navigate("AddListingScreen", {
                      isEdit: true,
                      id: id,
                      editItem: item,
                      images: images,
                    })
                  }
                  style={styles.buttonEdit}
                >
                  <Text>Edit</Text>
                </Button>
                <Button
                  rounded
                  block
                  onPress={() => markSold()}
                  style={styles.buttonSold}
                >
                  <Text>{sold ? "Sold" : "Mark as Sold"}</Text>
                </Button>
              </View>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Root>
  );
};

ListingInfo.propTypes = {
  item: PropTypes.object,
  id: PropTypes.string,
};

export default ListingInfo;

const { height, width } = Dimensions.get("screen");
const styles = StyleSheet.create({
  buttonEdit: {
    backgroundColor: colors.primary,
    marginVertical: 15,
  },
  buttonSold: {
    backgroundColor: colors.secondary,
  },
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
  toast: {
    backgroundColor: colors.primary,
  },
});
