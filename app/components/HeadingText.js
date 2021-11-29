import React from "react";
import { Text, StyleSheet } from "react-native";

function HeadingText({ children, style }) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: "Roboto",
    textTransform: "capitalize",
    textDecorationLine: "underline",
  },
});

export default HeadingText;
