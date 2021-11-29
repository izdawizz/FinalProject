import React from "react";
import LottieView from "lottie-react-native";

function LoadingCart() {
  return (
    <LottieView
      autoPlay
      loop
      source={require("../assets/animations/resultsLoadingCart.json")}
    />
  );
}

export default LoadingCart;
