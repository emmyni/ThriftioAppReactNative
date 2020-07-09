import React from "react";
import { StyleSheet } from "react-native";
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Text,
  Right,
  Subtitle,
} from "native-base";

export default function HeaderComponent({
  navigation,
  title,
  subtitle,
  refresh,
}) {
  return (
    <Header>
      <Left>
        <Button
          transparent
          onPress={() => {
            navigation.goBack();
            if (refresh) {
              refresh();
            }
          }}
        >
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Text numberOfLines={1} style={{ fontWeight: "bold" }}>
          {title}
        </Text>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </Body>
      <Right />
    </Header>
  );
}

const styles = StyleSheet.create({});
