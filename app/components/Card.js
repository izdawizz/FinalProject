import React from "react";
import { View, StyleSheet, Image } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import HeadingText from "./HeadingText";

function Card({ title, description, image }) {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={image} />
      <View style={styles.detailsContainer}>
        <HeadingText style={styles.title}>{title}</HeadingText>
        {description && <AppText style={styles.desc}>{description}</AppText>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
    borderWidth: 5,
    borderColor: colors.black,
    borderRadius: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    backgroundColor: colors.primary,
    marginTop: 7,
    padding: 5,
    borderTopWidth: 2,
    borderColor: colors.black,
  },
  title: {
    fontSize: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    color: colors.black,
  },
  desc: {
    fontSize: 15,
    color: colors.light,
    alignSelf: "center",
  },
});

export default Card;
