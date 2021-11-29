import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

import colors from "../config/colors";
import { MaterialIcons } from "@expo/vector-icons";

function RecentItemCard({ itemName, image, onPress, style, onXPress }) {
  return (
    <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View style={[styles.container, style]}>
        {image && <Image style={styles.image} source={{ uri: image }} />}
        <View
          style={{ borderTopColor: colors.black, borderTopWidth: 2 }}
        ></View>
        {itemName && (
          <View style={styles.textContainer}>
            <Text style={styles.itemName} adjustsFontSizeToFit>
              {itemName}
            </Text>
          </View>
        )}
        <View style={styles.xContainer}>
          <TouchableOpacity onPress={onXPress}>
            <MaterialIcons name="close" size={40} color={colors.black} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 200,
    borderRadius: 10,
    margin: 10,
    borderWidth: 2,
    borderColor: colors.black,
    backgroundColor: colors.white,
    overflow: "hidden",
    justifyContent: "center",
    alignContent: "center",
  },
  xContainer: {
    position: "absolute",
    top: "0%",
    right: "0%",
  },
  image: {
    width: undefined,
    height: undefined,
    resizeMode: "cover",
    flex: 5,
  },
  textContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    flex: 1,
  },
  itemName: {
    fontSize: 20,
    fontFamily: "Roboto",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default RecentItemCard;
