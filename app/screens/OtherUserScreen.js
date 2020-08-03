import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Icon,
  Right,
  Button,
} from "native-base";
import firebase from "firebase";

import Listing from "./components/Listing";
import Header from "./common/HeaderComponent";

import NavigationMenu from "./common/NavigationMenu";
import colors from "../config/colors";

const OtherUserScreen = ({ navigation, route }) => {
  const { itemUser, numItems, userId } = route.params;
  const [items, setItems] = useState({});

  useEffect(() => {
    firebase
      .database()
      .ref("items")
      .orderByChild("user_id")
      .equalTo(userId)
      .on("value", (snapshot) => {
        if (snapshot.val()) setItems(snapshot.val());
      });
  }, []);

  return (
    <Container>
      <Header navigation={navigation} />
      <Content padder>
        <Card style={styles.card}>
          <CardItem>
            <Thumbnail
              source={{
                uri:
                  itemUser.profile_picture ||
                  "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg",
              }}
            />
          </CardItem>
          <CardItem>
            <View>
              {itemUser.first_name && itemUser.last_name && (
                <Text style={styles.profileText}>
                  {itemUser.first_name + " " + itemUser.last_name}
                </Text>
              )}
              <Text style={styles.profileText} note>
                {itemUser.email}
              </Text>
            </View>
          </CardItem>
        </Card>
        {items &&
          Object.keys(items).map((key) => {
            return (
              <Listing
                key={key}
                id={key}
                item={items[key]}
                navigation={navigation}
              />
            );
          })}
      </Content>
      <NavigationMenu navigation={navigation} />
    </Container>
  );
};

export default OtherUserScreen;

const { height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  card: {
    height: height * 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    textAlign: "center",
  },
  signOut: {
    borderColor: colors.secondary,
  },
  signOutText: {
    color: colors.secondary,
  },
});
