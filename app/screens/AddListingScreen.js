import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import {
  Container,
  Content,
  Form,
  Icon,
  Item,
  Label,
  Input,
  Button,
  Card,
  CardItem,
  Left,
  Body,
  Right,
} from "native-base";
import firebase from "firebase";
import uuid from "uuid-random";

import colors from "../config/colors";

const AddListing = () => {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    getPermissionAsync();
  });

  const getPermissionAsync = async () => {
    if (Platform.OS == "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    // TODO: android solution
  };

  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImages([...images, result.uri]);
      }
    } catch (E) {
      console.log(E);
    }
  };

  const createPost = () => {
    let addItem = {
      item_name: item,
      price: price,
      desc: desc,
      location: location,
      images: images,
      user_id: firebase.auth().currentUser.uid,
      created_at: Date.now(),
    };

    // console.log(addItem);

    // firebase
    //   .database()
    //   .ref("/items/" + uuid())
    //   .set(addItem);
  };

  return (
    <Container>
      <Content>
        <View style={styles.container}>
          <View>
            <Card
              transparent
              style={{
                flexDirection: "row",
                justifyContent:
                  images.length < 2 ? "flex-start" : "space-around",
              }}
            >
              {images.length < 3 && (
                <CardItem>
                  <Button
                    bordered
                    onPress={_pickImage}
                    style={styles.addButton}
                  >
                    <Icon active name="add" style={styles.addIcon} />
                  </Button>
                </CardItem>
              )}

              {images.map((photo, index) => {
                return (
                  <CardItem key={index}>
                    <Image source={{ uri: photo }} style={styles.image} />
                  </CardItem>
                );
              })}
            </Card>
          </View>
          <View>
            <Form>
              <Item floatingLabel>
                <Icon active name="archive" style={styles.icon} />
                <Label>Item</Label>
                <Input onChangeText={(text) => setItem(text)} />
              </Item>
              <Item floatingLabel last>
                <Icon active name="logo-usd" style={styles.icon} />
                <Label>Price</Label>
                <Input onChangeText={(text) => setPrice(text)} />
              </Item>
              <Item floatingLabel last>
                <Icon active name="information-circle" style={styles.icon} />
                <Label>Description</Label>
                <Input
                  multiline={true}
                  onChangeText={(text) => setDesc(text)}
                />
              </Item>
              <Item floatingLabel last>
                <Icon active name="map" style={styles.icon} />
                <Label>Location</Label>
                <Input onChangeText={(text) => setLocation(text)} />
              </Item>
            </Form>
            <View style={styles.submitContainer}>
              <Button block onPress={() => createPost()}>
                <Text style={styles.submitText}>Submit</Text>
              </Button>
            </View>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default AddListing;

const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  addButton: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    color: colors.primary,
  },
  addIcon: {
    fontSize: 40,
  },
  container: {
    flex: 1,
    height: height,
    width: width,
    justifyContent: "center",
  },
  icon: {
    color: colors.primary,
  },
  image: {
    width: 100,
    height: 100,
  },
  submitContainer: {
    paddingVertical: 30,
    paddingHorizontal: 5,
  },
  submitText: {
    color: colors.white,
  },
});
