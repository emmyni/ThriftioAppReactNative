import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Thumbnail } from "native-base";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../config/colors";

const Tag = ({ name, image, index, searchTag, filterCategory }) => {
  console.log(filterCategory);
  console.log(index);
  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        var { x, y, width, height } = event.nativeEvent.layout;
      }}
    >
      <TouchableOpacity
        onPress={() => searchTag(index)}
        style={
          filterCategory == index ? { backgroundColor: colors.primary } : ""
        }
      >
        <Thumbnail source={image} style={styles.thumbnail} />
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
  text: {
    paddingTop: 5,
    alignSelf: "center",
  },
  thumbnail: {
    alignSelf: "center",
  },
});
