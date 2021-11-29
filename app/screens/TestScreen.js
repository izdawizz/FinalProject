import React from "react";
import {
  Image,
  FlatList,
  StyleSheet,
  View,
  Text,
  Linking,
  TouchableOpacity,
} from "react-native";

import ItemLink from "../components/ItemLink";
import colors from "../config/colors";

const results = [
  {
    name: "Item 1",
    store: "Walmart",
    url: "Walmart.com/item_1",
    price: "$14.99",
  },
  {
    name: "Item 2",
    store: "Target",
    url: "Target.com/item_2",
    price: "$199999.99",
  },
  {
    name: "This is an abnormally large item name used for the purpose of testing whether or not the screen will resize to how long this dumb name is.",
    store: "Costco",
    url: "Costco.com/item_3",
    price: "$79.99",
  },
];

function TestScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>Title of Item</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          style={styles.screenshot}
          source={require("../assets/calc.png")}
        />
      </View>

      <View style={styles.InstrContainer}>
        <Text style={styles.InstrText}>Click on a box to open the URL</Text>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={results}
          keyExtractor={(results) => results.name.toString()}
          // initialNumToRender={3}
          renderItem={({ item }) => (
            <ItemLink
              itemName={item.name}
              webName={item.store}
              link={item.url}
              price={item.price}
              // onPress={() => console.log("Clicked")}
              // Commented out for testing screen layout
              onPress={() => console.log("Clicked")}
            />
          )}
        />
      </View>

      <TouchableOpacity
        style={{ bottom: 0 }}
        onPress={() => console.log("Clicked")}
      >
        <View style={styles.homeButtonContainer}>
          <Text style={styles.homeText}>Return to Home</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cartBlue,
    alignItems: "center",
  },
  nameContainer: {
    height: 30,
    width: "94%",
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
  nameText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 15,
    color: colors.black,
  },
  imageContainer: {
    width: "94%",
    height: "35%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 4,
    borderTopWidth: 0,
    borderColor: colors.black,
    overflow: "hidden",
  },
  screenshot: {
    width: undefined,
    height: undefined,
    flex: 1,
  },
  listContainer: {
    width: "94%",
    height: "35%",
    flexGrow: 1,
  },
  InstrContainer: {
    flexDirection: "row",
    height: 30,
    width: "94%",
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
    marginBottom: "5%",
  },
  InstrText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 15,
    color: colors.black,
  },
  LoadingContainer: {
    flex: 1,
    backgroundColor: colors.cartBlue,
    alignItems: "center",
  },
  LoadTextContainer: {
    position: "absolute",
    height: 30,
    width: "94%",
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 5,
    marginTop: "5%",
    marginBottom: "5%",
    bottom: "10%",
  },
  LoadText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 15,
    color: colors.black,
  },
  homeText: {
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 15,
    color: colors.black,
  },
  homeButtonContainer: {
    height: 30,
    width: 200,
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 3,
    margin: 10,
  },
});

export default TestScreen;
