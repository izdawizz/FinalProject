import * as React from "react";
import { Image, Text, StyleSheet, View } from "react-native";

import colors from "../config/colors";
import WelcomeIndicator from "../components/WelcomeIndicator";
import Screen from "../components/Screen";

function WelcomeScreen({ navigation }) {
  return (
    <Screen style={styles.background}>
      <Screen style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <View>
          <Text
            style={{
              fontFamily: "Roboto",
              fontSize: 30,
              fontStyle: "italic",
              fontWeight: "bold",
              color: colors.white,
              textAlign: "left",
              marginLeft: 20,
              marginBottom: 20,
              textTransform: "capitalize",
            }}
          >
            Snap a shot,
          </Text>
          <Text
            style={{
              fontFamily: "Roboto",
              fontSize: 30,
              fontStyle: "italic",
              fontWeight: "bold",
              color: colors.white,
              textAlign: "right",
              marginRight: 20,
              textTransform: "capitalize",
            }}
          >
            Shop on the spot.
          </Text>
        </View>
        <View style={styles.loading}>
          <WelcomeIndicator />
        </View>
        <Text>
          {setTimeout(() => { navigation.navigate("HomeScreen"); }, 2000)}
        </Text>
      </Screen>
    </Screen>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.cartBlue,
    flex: 1,
  },
  logoContainer: {
    justifyContent: "space-evenly",
    alignContent: "center",
    flex: 1,
  },
  logo: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  loading: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    transform: [{ scale: 2 }],
    marginTop: "-10%",
  },
});

export default WelcomeScreen;
