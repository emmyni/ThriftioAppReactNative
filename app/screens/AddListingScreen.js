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

const AddListing = () => {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
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

  return (
    <Container>
      <Content>
        <View style={styles.container}>
          <View>
            <Card
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              {images.length < 3 && (
                <CardItem>
                  <Button
                    onPress={_pickImage}
                    style={{ width: 100, height: 100 }}
                  >
                    <Icon active name="archive" />
                  </Button>
                </CardItem>
              )}

              {images.map((photo, index) => {
                return (
                  <CardItem key={index}>
                    <Image
                      source={{ uri: photo }}
                      style={{ width: 100, height: 100 }}
                    />
                  </CardItem>
                );
              })}
            </Card>
          </View>
          <View>
            <Form>
              <Item floatingLabel>
                <Icon active name="archive" />
                <Label>Item</Label>
                <Input onChangeText={(text) => setItem(text)} />
              </Item>
              <Item floatingLabel last>
                <Icon active name="logo-usd" />
                <Label>Price</Label>
                <Input onChangeText={(text) => setPrice(text)} />
              </Item>
              <Item floatingLabel last>
                <Icon active name="information-circle" />
                <Label>Description</Label>
                <Input
                  multiline={true}
                  onChangeText={(text) => setDesc(text)}
                />
              </Item>
            </Form>
            <View style={styles.button}>
              <Button block light>
                <Text>Submit</Text>
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
  button: {
    paddingVertical: 30,
    paddingHorizontal: 5,
  },
  container: {
    flex: 1,
    height: height,
    width: width,
    justifyContent: "center",
  },
});
