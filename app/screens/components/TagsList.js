import React from "react";
import { StyleSheet } from "react-native";
import Tag from "./Tag";

import appDetails from "../../config/appDetails";
import { ScrollView } from "react-native-gesture-handler";

const TagsList = ({ searchTag, filterCategory }) => {
  return (
    <ScrollView horizontal={true}>
      {appDetails.category.map((tag) => {
        return (
          <Tag
            name={tag.name}
            image={tag.image}
            index={tag.index}
            searchTag={searchTag}
            key={tag.index}
            filterCategory={filterCategory}
          />
        );
      })}
    </ScrollView>
  );
};

export default TagsList;

const styles = StyleSheet.create({});
