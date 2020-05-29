import React from "react";
import { StyleSheet } from "react-native";
import { Container, Content, Spinner } from "native-base";

import colors from "../../config/colors";

const Spinner = () => {
  return (
    <Container styles={{ justifyContent: "center", alignItems: "center" }}>
      <Spinner color={colors.primary} />
    </Container>
  );
};

export default Spinner;

const styles = StyleSheet.create({});
