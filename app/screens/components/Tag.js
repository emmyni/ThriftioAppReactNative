import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Thumbnail } from "native-base";
import PropTypes from "prop-types";

const Tag = ({ name, image }) => {
  return (
    <View style={styles.container}>
      <Thumbnail source={require("../../assets/logo-red.png")} />
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

export default Tag;

Tag.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
};

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  text: { paddingTop: 5 },
});
