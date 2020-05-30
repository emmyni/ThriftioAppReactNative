import React, { useState, useEffect } from "react";
import { Image, Animated, StyleSheet, Dimensions } from "react-native";
import {
  Container,
  Header,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Icon,
  Item,
  Input,
  Button,
  Form,
  Right,
} from "native-base";
import { ScrollView } from "react-native-gesture-handler";

import colors from "../config/colors";

const ListingInfo = ({ route }) => {
  const [message, setMessage] = useState("Is this still available?");
  const { images } = route.params;
  const { item } = route.params;

  const sendMessage = () => {};

  return (
    <ScrollView>
      <Container>
        <Card transparent>
          <CardItem cardBody>
            <ScrollView horizontal={true}>
              {images.map((image, index) => {
                return (
                  <Image
                    key={index}
                    source={{ uri: image }}
                    style={styles.image}
                  />
                );
              })}
            </ScrollView>
          </CardItem>

          <CardItem>
            <Body>
              <Text>{item.item_name}</Text>
              <Text style={styles.priceText}>${item.price}</Text>
              <Text note>{item.desc}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: "Image URL" }} />
              <Body>
                <Text>NativeBase</Text>
                <Text note>GeekyAnts</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
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
        <View style={{ height: 800 }}></View>
      </Container>
    </ScrollView>
  );
};

export default ListingInfo;

const { height, width } = Dimensions.get("screen");
const styles = StyleSheet.create({
  form: {
    margin: 10,
  },
  image: {
    height: height / 2,
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
