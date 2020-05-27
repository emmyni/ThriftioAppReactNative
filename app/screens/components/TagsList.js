import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Tag from "./Tag";

import appDetails from "../../config/appDetails";
import { ScrollView } from "react-native-gesture-handler";

const TagsList = () => {
  return (
    <ScrollView horizontal={true}>
      {appDetails.category.map((tag) => {
        return <Tag name={tag.name} image={tag.image} key={tag.index} />;
      })}
    </ScrollView>
  );
};

export default TagsList;

const styles = StyleSheet.create({});
