import React from "react";
import { Image, StyleSheet } from "react-native";
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
  Content,
} from "native-base";

const ListingInfo = ({ route }) => {
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

  console.log(images);

  return (
    <Container>
      <View>
        <DeckSwiper
          ref={(c) => (this._deckSwiper = c)}
          dataSource={images}
          renderEmpty={() => (
            <View style={{ alignSelf: "center" }}>
              <Text>Over</Text>
            </View>
          )}
          renderItem={(image) => (
            <Card style={{ elevation: 3 }}>
              <CardItem>
                {/* <Left>
                    <Button onPress={() => this._deckSwiper._root.swipeLeft()}>
                      <Icon name="arrow-back" />
                    </Button>
                  </Left> */}
                <Image
                  style={{ height: 300, flex: 1 }}
                  source={{ uri: image }}
                />
                {/* <Right>
                    <Button onPress={() => this._deckSwiper._root.swipeRight()}>
                      <Icon name="arrow-forward" />
                    </Button>
                  </Right> */}
              </CardItem>
            </Card>
          )}
        />
      </View>
    </Container>
  );
};

export default ListingInfo;

const styles = StyleSheet.create({});
