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

import NavigationMenu from "./common/NavigationMenu";
import colors from "../config/colors";

const OtherUserScreen = ({ itemUser, numItems }) => {
  console.log(itemUser);
  return (
    <Container>
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
              {itemUser.displayName && (
                <Text style={styles.profileText}>
                  {itemUser.first_name && itemUser.last_name}
                </Text>
              )}
              <Text style={styles.profileText} note>
                {itemUser.email}
              </Text>
            </View>
          </CardItem>
        </Card>
        <Card>
          <CardItem
            button
            onPress={() =>
              navigation.navigate("MyListingsScreen", { mine: true })
            }
          >
            <Icon active name="list" />
            <Text>My Listings</Text>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </CardItem>
          <CardItem
            button
            onPress={() => navigation.navigate("MessagesScreen")}
          >
            <Icon active name="chatboxes" />
            <Text>My Messages</Text>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </CardItem>
          <CardItem
            button
            onPress={() =>
              navigation.navigate("MyListingsScreen", { mine: false })
            }
          >
            <Icon active name="bookmark" />
            <Text>Saved Listings</Text>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </CardItem>
        </Card>
        <Card transparent>
          <CardItem style={{ justifyContent: "center" }}>
            <Button
              bordered
              onPress={() => firebase.auth().signOut()}
              style={styles.signOut}
            >
              <Text style={styles.signOutText}>Sign out</Text>
            </Button>
          </CardItem>
        </Card>
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
