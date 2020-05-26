import React from "react";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../../config/colors";

const backgroundGradient = () => {
  const { height } = Dimensions.get("screen");
  return (
    <LinearGradient
      colors={[colors.primary, "transparent"]}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: height / 1.5,
      }}
    />
  );
};

export default backgroundGradient;
