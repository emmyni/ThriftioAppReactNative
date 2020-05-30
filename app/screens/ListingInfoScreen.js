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
  Button,
  Right,
} from "native-base";
import { ScrollView } from "react-native-gesture-handler";

const ListingInfo = ({ route }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const { images } = route.params;
  const { item } = route.params;
  const cards = [
    {
      text: "Card One",
      name: "One",
      image: require("../assets/chair.jpg"),
    },
    {
      text: "Card Two",
      name: "Two",
      image: require("../assets/chair.jpg"),
    },
    {
      text: "Card Three",
      name: "Three",
      image: require("../assets/chair.jpg"),
    },
  ];

  const { height, width } = Dimensions.get("screen");

  return (
    <Container>
      <Card transparent>
        <CardItem cardBody>
          <ScrollView horizontal={true}>
            {images.map((image, index) => {
              return (
                // <Card
                //   transparent
                //   key={index}
                //   styles={{ margin: 0, padding: 0 }}
                // >
                //   <CardItem>
                // <View styles={{ padding: 20 }}>
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={{
                    height: height / 2,
                    width: width,

                    flex: 1,
                  }}
                />
                // </View>
                //   </CardItem>
                // </Card>
              );
            })}
          </ScrollView>
        </CardItem>

        <CardItem>
          <Body>
            <Text>{item.item_name}</Text>
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
    </Container>
  );
};

export default ListingInfo;

const styles = StyleSheet.create({});
