import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Thumbnail } from "native-base";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";

const Tag = ({ name, image, index, searchTag }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => searchTag(index)}>
        <Thumbnail source={image} />
        <Text style={styles.text}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Tag;

Tag.propTypes = {
  name: PropTypes.string,
  image: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 5,
  },
  text: { paddingTop: 5 },
});
