import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Icon,
  Button,
  Title,
} from "native-base";

const MessagesScreen = ({ navigation: { goBack } }) => {
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Messages</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <List>
          <ListItem avatar>
            <Left>
              <Thumbnail source={{ uri: "Image URL" }} />
            </Left>
            <Body>
              <Text>Kumar Pratik</Text>
              <Text note>
                Doing what you like will always keep you happy . .
              </Text>
            </Body>
            <Right>
              <Text note>3:43 pm</Text>
            </Right>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({});
