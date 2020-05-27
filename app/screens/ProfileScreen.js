import React from "react";
import { StyleSheet, View, Image } from "react-native";
import {
  Container,
  Content,
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

import NavigationMenu from "./common/NavigationMenu";

const ProfileScreen = ({ navigation }) => {
  return (
    <Container>
      <Content padder>
        <Card>
          <CardItem style={{ justifyContent: "center" }}>
            <Thumbnail source={require("../assets/logo-red.png")} />
          </CardItem>
          <CardItem cardBody style={{ justifyContent: "center" }}>
            <View>
              <Text>@Emmy</Text>
              <Text note>Hi, I'm Emmy</Text>
            </View>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name="thumbs-up" />
                <Text>12 Likes</Text>
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <Icon active name="chatbubbles" />
                <Text>4 Comments</Text>
              </Button>
            </Body>
            <Right>
              <Text>11h ago</Text>
            </Right>
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
      </Content>
      <NavigationMenu navigation={navigation} />
    </Container>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
