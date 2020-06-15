import React from "react";
import { StyleSheet, Image } from "react-native";
import {
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
import colors from "../../config/colors";

export default function MessageListingInfo({ id, item, images, navigation }) {
  return (
    <Card>
      <CardItem>
        <Left>
          <Thumbnail source={{ uri: images[0] }} />
          <Body>
            <Text>{item.item_name}</Text>
            <Text note>{item.desc}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody></CardItem>
      <CardItem>
        <Left>
          <Button
            style={styles.button}
            onPress={() =>
              navigation.navigate("ListingInfoScreen", {
                images: images,
                item: item,
                id: id,
              })
            }
          >
            <Icon active name="thumbs-up" />
            <Text>View Listing</Text>
          </Button>
        </Left>
        <Right>
          <Button style={styles.button}>
            <Icon active name="chatbubbles" />
            <Text>Rate Seller</Text>
          </Button>
        </Right>
      </CardItem>
    </Card>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
  },
});
