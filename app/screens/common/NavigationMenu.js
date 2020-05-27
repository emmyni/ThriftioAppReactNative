import React from "react";
import { StyleSheet, View } from "react-native";
import { Footer, FooterTab, Button, Icon, Text } from "native-base";

import colors from "../../config/colors";

const NavigationMenu = ({ navigation }) => {
  return (
    <Footer>
      <FooterTab>
        <Button vertical onPress={() => navigation.navigate("FeedScreen")}>
          <Icon style={styles.sideButtons} name="apps" />
          <Text>Feed</Text>
        </Button>
        <Button
          vertical
          style={styles.addButton}
          onPress={() => navigation.navigate("AddListingScreen")}
        >
          <Icon style={styles.addIcon} active name="add" />
        </Button>
        <Button vertical onPress={() => navigation.navigate("ProfileScreen")}>
          <Icon style={styles.sideButtons} name="person" />
          <Text>Profile</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

export default NavigationMenu;

const styles = StyleSheet.create({
  addButton: {
    alignSelf: "center",
    position: "absolute",
    elevation: 4,
    height: 70,
    width: 70,
    bottom: 0,
    left: "40%",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 35,
    backgroundColor: colors.primary,
    justifyContent: "center",
  },
  addIcon: {
    color: colors.white,
  },
  sideButtons: {
    color: colors.primary,
  },
});
