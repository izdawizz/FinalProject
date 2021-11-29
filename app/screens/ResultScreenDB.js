import React, { useEffect, useState } from "react";
import {
  Image,
  FlatList,
  StyleSheet,
  View,
  Linking,
  ActivityIndicator,
  ImageBackgroundBase,
  TouchableOpacity,
  Text,
} from "react-native";

import ItemLink from "../components/ItemLink";
import colors from "../config/colors";
import * as imgDB from "../../database/SQLiteDB";

function ResultScreenDB({ navigation, route }) {
  const [data, setData] = useState([]);
  const [checkpoint, setCheckpoint] = useState(false);
  const { imageURL, databaseID, imageName } = route.params;

  if (!checkpoint) {
    imgDB.database
      .getItemDetails(databaseID)
      .then((response) => {
        setData(response);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setCheckpoint(true));
  }

  // console.log('results DB', data);

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText} adjustsFontSizeToFit>
          {imageName}
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image style={styles.screenshot} source={{ uri: imageURL }} />
      </View>

      <View style={styles.InstrContainer}>
        <Text style={styles.InstrText}>Click on a box to open the URL</Text>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={data}
          keyExtractor={(results) => results.itemUrl.toString()}
          // initialNumToRender={3}
          renderItem={({ item }) => (
            <ItemLink
              itemName={item.itemName}
              webName={item.storeName}
              link={item.itemUrl}
              price={item.price}
              onPress={() => Linking.openURL(item.itemUrl)}
            />
          )}
        />
      </View>

      <TouchableOpacity
        style={{ bottom: 0 }}
        onPress={() => navigation.navigate("HomeScreen")}
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
    borderWidth: 4,
    marginTop: "5%",
  },
  nameText: {
    flex: 1,
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 15,
    margin: 2,
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

export default ResultScreenDB;
