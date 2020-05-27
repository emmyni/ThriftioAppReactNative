import React from "react";
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

const ProfileScreen = ({ navigation }) => {
  return (
    <Container>
      <Content padder>
        <Card style={styles.card}>
          <CardItem>
            <Thumbnail source={require("../assets/logo-red.png")} />
          </CardItem>
          <CardItem>
            <View>
              <Text>@Emmy</Text>
              <Text note>Hi, I'm Emmy</Text>
            </View>
          </CardItem>
        </Card>
        <Card>
          <CardItem
            button
            onPress={() => navigation.navigate("MyListingsScreen")}
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
            onPress={() => navigation.navigate("SavedListingsScreen")}
          >
            <Icon active name="bookmark" />
            <Text>Saved Listings</Text>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Button onPress={() => firebase.auth().signOut()}>
              <Text>Sign out</Text>
            </Button>
          </CardItem>
        </Card>
      </Content>
      <NavigationMenu navigation={navigation} />
    </Container>
  );
};

export default ProfileScreen;

const { height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  card: {
    height: height * 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
});
