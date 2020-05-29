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

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(firebase.auth().currentUser);
  }, []);

  return (
    <Container>
      <Content padder>
        <Card style={styles.card}>
          <CardItem>
            <Thumbnail
              source={{
                uri:
                  user.photoURL ||
                  "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg",
              }}
            />
          </CardItem>
          <CardItem>
            <View>
              {user.displayName && (
                <Text style={styles.profileText}>{user.displayName}</Text>
              )}
              <Text style={styles.profileText} note>
                {user.email}
              </Text>
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
        <Card transparent>
          <CardItem style={{ justifyContent: "center" }}>
            <Button bordered onPress={() => firebase.auth().signOut()}>
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
  profileText: {
    textAlign: "center",
  },
});
