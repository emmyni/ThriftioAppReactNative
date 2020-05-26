import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Tag from "./Tag";

import appDetails from "../../config/appDetails";

const TagsList = () => {
  return (
    <View style={styles.tagContainer}>
      {appDetails.category.map((tag) => {
        return <Tag name={tag.name} image={tag.image} key={tag.index} />;
      })}
    </View>
  );
};

export default TagsList;

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
