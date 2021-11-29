import React from "react";
import LottieView from "lottie-react-native";

function WelcomeIndicator() {
  return (
    <LottieView
      autoPlay
      loop
      source={require("../assets/animations/WelcomeScreenLoad.json")}
    />
  );
}

export default WelcomeIndicator;
