/* 
Camera Screen elements with flash, flip, and preview.
*/

import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { Camera } from "expo-camera";
import * as imgDB from "../../database/SQLiteDB";
import colors from "../config/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

//adjusts things according to phone size
const WINDOW_HEIGHT = Dimensions.get("window").height;
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);

//main function for camera screen
function cameraScreen({ navigation }) {
  // conditions to keep track when using camera such as flip and flash modes
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraFlash, setCameraFlash] = useState(
    Camera.Constants.FlashMode.off
  );
  const [isPreview, setIsPreview] = useState(false);
  // const [isImageDB, setImageDB] = useState(false); //unused
  const [isCameraReady, setIsCameraReady] = useState(false);

  //cloudifay images
  const [imageSource, setIMGsource] = useState("No Source");

  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // is camera detected? on?
  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  //function to capture the image
  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.7, base64: true, };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.base64;
      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        // console.log("picture source", source);
        setIMGsource(source);
      }
    }
  };

  //function to flip to front or back camera
  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  //function to turn off or on the flash
  const flashingMode = () => {
    if (isPreview) {
      return;
    }

    setCameraFlash((prevCameraFlash) =>
      prevCameraFlash === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };

  const saveImage = async () => {
    let base64Img = `data:image/jpg;base64,${imageSource}`;
    let apiUrl = "https://api.cloudinary.com/v1_1/dzr34w1dd/image/upload";
    let data = {
      file: base64Img,
      upload_preset: "hskz2avq",
    };

    fetch(apiUrl, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then(async (response) => {
        let data = await response.json();
        if (data.secure_url) {
          let dataurl = data.url;
          let imgname = data.original_filename
          const returnedID = await imgDB.database.insertUrl_RecentItems(
            dataurl, "name"
            //"name" is placeholder
          );
          // console.log(data.secure_url);
          console.log("returnedID (Camera Screen): %d", returnedID);

          navigation.navigate("ResultScreen", { imageURL: data.secure_url, imageID: returnedID, imageName: imgname });
        }
      })
      .catch((err) => {
        // alert('Cannot upload');
        // console.log('Cannot upload');
        console.log(err);
      });
  };

  const renderImagePreview = () => (
    <View style={styles.saveCancelContainer}>
      <View>
        <TouchableOpacity onPress={cancelPreview}>
          <MaterialIcons name="close" size={50} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={saveImage}>
          <MaterialIcons name="done" size={50} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  const renderCaptureControl = () => (
    <View style={styles.mainContainer}>
      <View style={styles.xContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <MaterialIcons name="close" size={50} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsContainer}>
        {/* flip to back or front camera */}
        <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
          <View style={styles.Icons}>
            <MaterialIcons
              name="flip-camera-android"
              size={35}
              color={colors.black}
            />
          </View>
        </TouchableOpacity>

        {/* capture image button */}
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={!isCameraReady}
          onPress={takePicture}
          style={styles.captureButton}
        />

        {/* flash mode button */}
        <TouchableOpacity disabled={!isCameraReady} onPress={flashingMode}>
          {/* <Text style={styles.flashText}>FLASH</Text> */}
          <View style={styles.Icons}>
            {cameraFlash ? (
              <MaterialIcons name="flash-on" size={35} color={colors.black} />
            ) : (
              <MaterialIcons name="flash-off" size={35} color={colors.black} />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.container}
        type={cameraType}
        flashMode={cameraFlash}
        onCameraReady={onCameraReady}
      />

      <View style={styles.container}>
        {/* Preview of picture taken with save and cancel buttons */}
        {isPreview && renderImagePreview()}
        {/* Camera screen with flip and flash buttons */}
        {!isPreview && renderCaptureControl()}
      </View>
    </SafeAreaView>
  );
}

// styles for beauty
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  mainContainer: {
    width: "100%",
    height: undefined,
    flex: 1,
    justifyContent: "space-between",
  },
  xContainer: {
    margin: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    margin: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  saveButton: {
    color: "#E9D105",
    margin: 5,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.black,
    height: 20,
    width: 60,
    textAlign: "center",
  },
  captureButton: {
    backgroundColor: colors.white,
    borderRadius: 5,
    borderWidth: 5,
    borderColor: colors.cartBlue,
    height: captureSize,
    width: captureSize,
    borderRadius: Math.floor(captureSize / 2),
    marginHorizontal: 31,
  },
  Icons: {
    backgroundColor: colors.white,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    borderWidth: 2,
    borderColor: colors.cartBlue,
  },
  saveCancelContainer: {
    flex: 1,
    width: "90%",
    height: undefined,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    top: "7%",
  },
});

export default cameraScreen;
