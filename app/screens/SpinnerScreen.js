import React from "react";
import { StyleSheet } from "react-native";
import { Container, Spinner } from "native-base";

import colors from "../config/colors";

const SpinnerScreen = () => {
  return (
    <Container style={{ justifyContent: "center", alignItems: "center" }}>
      <Spinner color={colors.primary} />
    </Container>
  );
};

export default SpinnerScreen;

const styles = StyleSheet.create({});
