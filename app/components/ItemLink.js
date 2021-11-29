import React from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";

import colors from "../config/colors";

function ItemLink({ itemName, webName, link, price, onPress }) {
  return (
    <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.storeText}>{webName}: </Text>
            {itemName && <Text style={styles.linkText}>{itemName}</Text>}
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Roboto",
              fontWeight: "bold",
              textDecorationLine: "underline",
            }}
          >
            Price:
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Roboto",
              fontWeight: "600",
              fontStyle: "italic",
            }}
          >
            {price}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    width: "100%",
    flexDirection: "row",
    borderWidth: 5,
    borderColor: colors.black,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: "space-between",
  },
  headingContainer: {},
  storeText: {
    fontSize: 21,
    fontFamily: "Roboto",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  linkText: {
    fontSize: 17,
    textDecorationLine: "underline",
    color: "blue",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    flex: 1,
  },
  priceContainer: {
    backgroundColor: colors.moneyGreen,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 7,
    flexBasis: 120,
    flexWrap: "nowrap",
  },
});

export default ItemLink;
