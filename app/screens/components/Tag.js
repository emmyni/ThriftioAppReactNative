import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Thumbnail } from "native-base";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../config/colors";

const Tag = ({ name, image, index, searchTag, filterCategory }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => searchTag(index)}
        style={
          filterCategory == index
            ? { backgroundColor: colors.secondaryFaded, borderRadius: 20 }
            : ""
        }
      >
        <Thumbnail source={image} style={styles.thumbnail} />
        <Text
          style={
            filterCategory == index ? [styles.text, styles.bold] : styles.text
          }
        >
          {name}
        </Text>
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
  bold: {
    fontWeight: "bold",
  },
  container: {
    marginHorizontal: 5,
    marginBottom: 5,
  },
  text: {
    paddingTop: 5,
    alignSelf: "center",
  },
  thumbnail: {
    alignSelf: "center",
  },
});
