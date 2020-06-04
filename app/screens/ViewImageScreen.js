import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "native-base";

import colors from "../config/colors";

const ViewImageScreen = ({ navigation, route }) => {
  const { image } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.closeIcon}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon active name="close-circle" style={{ color: "white" }} />
        </TouchableOpacity>
      </View>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={{ uri: image }}
      ></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  closeIcon: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },
  container: {
    backgroundColor: colors.black,
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ViewImageScreen;
