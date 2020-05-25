import React from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";

const LoginScreen = () => {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => onChangeText(text)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoginScreen;
