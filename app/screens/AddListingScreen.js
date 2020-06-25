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
  Picker,
} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";
import uuid from "uuid-random";
import moment from "moment";

import colors from "../config/colors";
import appDetails from "../config/appDetails";

import SpinnerScreen from "./SpinnerScreen";
import Header from "./common/HeaderComponent";

const AddListing = ({ navigation, route }) => {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState(undefined);
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getPermissionAsync();
    if (route.params) {
      setIsEdit(true);
      const editItem = route.params.editItem;
      setItem(editItem.item_name);
      setPrice(editItem.price);
      setDesc(editItem.desc);
      setCategory(editItem.category);
      setLocation(editItem.location);
      setImages(route.params.images);
    }
  }, []);

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

  const uploadImage = async (uri, title, id) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    let ref = firebase
      .storage()
      .ref(firebase.auth().currentUser.uid + "/" + id)
      .child(title.toString());
    return ref.put(blob);
  };

  const createPost = async () => {
    setLoading(true);

    const id = isEdit ? route.params.id : uuid();

    images.map((image, index) => {
      uploadImage(image, index, id);
    });

    let addItem = {
      item_name: item,
      price: price,
      category: category,
      desc: desc,
      location: location,
      user_id: firebase.auth().currentUser.uid,
      sold: 0,
      created_at: moment().format(),
    };
    if (isEdit) {
      await firebase
        .database()
        .ref("/items/" + id)
        .update(addItem);
    } else {
      await firebase
        .database()
        .ref("/items/" + id)
        .set(addItem);
    }

    setLoading(false);
    navigation.navigate("ListingInfoScreen", { images: images, item: addItem });
  };

  const updateCategory = (value) => {
    setCategory(value);
  };

  const deleteImage = (image) => {
    setImages(images.filter((photo) => photo != image));
  };

  if (loading) return <SpinnerScreen />;

  return (
    <Container>
      <Header
        navigation={navigation}
        title={isEdit ? "Edit Listing" : "Add Listing"}
      />
      <View style={styles.container}>
        <View>
          <Card
            transparent
            style={{
              flexDirection: "row",
              justifyContent: images.length < 2 ? "flex-start" : "space-around",
            }}
          >
            {images.length < 3 && (
              <CardItem>
                <Button bordered onPress={_pickImage} style={styles.addButton}>
                  <Icon active name="add" style={styles.addIcon} />
                </Button>
              </CardItem>
            )}

            {images.map((photo, index) => {
              return (
                <CardItem key={index}>
                  <View style={styles.closeIcon}>
                    <TouchableOpacity onPress={() => deleteImage(photo)}>
                      <Icon active name="close-circle" />
                    </TouchableOpacity>
                  </View>
                  <Image source={{ uri: photo }} style={styles.image} />
                </CardItem>
              );
            })}
          </Card>
        </View>
        <View>
          <Form>
            <Item
              floatingL
              floatingLabel={!isEdit}
              stackedLabel={isEdit}
              required={true}
              abel
            >
              <Icon active name="archive" style={styles.icon} />
              <Label>Item</Label>
              <Input onChangeText={(text) => setItem(text)}>{item}</Input>
            </Item>
            <Item floatingLabel={!isEdit} stackedLabel={isEdit} required={true}>
              <Icon active name="logo-usd" style={styles.icon} />
              <Label>Price</Label>
              <Input
                onChangeText={(text) => setPrice(text.replace(/[^0-9]/g, ""))}
                keyboardType="numeric"
              >
                {price}
              </Input>
            </Item>
            <Item style={{ marginTop: 20 }}>
              <Icon active name="archive" style={styles.icon} />
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Category"
                placeholderStyle={{ color: colors.gray }}
                placeholderIconColor={colors.primary}
                style={{ width: undefined }}
                selectedValue={category}
                onValueChange={updateCategory.bind(this)}
              >
                {appDetails.category.map((category) => {
                  return (
                    <Picker.Item
                      key={category.index}
                      label={category.name}
                      value={category.index}
                    />
                  );
                })}
              </Picker>
            </Item>
            <Item floatingLabel={!isEdit} stackedLabel={isEdit} required={true}>
              <Icon active name="information-circle" style={styles.icon} />
              <Label>Description</Label>
              <Input multiline={true} onChangeText={(text) => setDesc(text)}>
                {desc}
              </Input>
            </Item>
            <Item
              floatingLabel={!isEdit}
              stackedLabel={isEdit}
              required={true}
              last
            >
              <Icon active name="map" style={styles.icon} />
              <Label>Location</Label>
              <Input onChangeText={(text) => setLocation(text)}>
                {location}
              </Input>
            </Item>
          </Form>
          <View style={styles.submitContainer}>
            <Button block onPress={() => createPost()}>
              <Text style={styles.submitText}>Submit</Text>
            </Button>
          </View>
        </View>
      </View>
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
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
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
