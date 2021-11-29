
## #SnapShop#

To view our code and video demo, follow the GitHub Link:
	https://github.com/AudiCmpE28/FinalProject


# To Run the Application
1) Must Download the app "Expo Go" by 'Nametag' for either android or ios.
2) Head over to the following link to scan QR code:
	https://expo.dev/@audicmpe/snapshopapp
3) Run the app


# Application Structure
App.js|
    -> app
      -> screens
        -> cameraScreen.js
        -> HomeScreen.js
        -> ResultScreen.js
        -> ResultScreen.js
        -> TestScreen.js
        -> WelcomeScreen.js
        

App.js creates a stack of all the screens so that all screens can navigate to 
eachother. Once the main file of App.js executes, it will redirect to the
WelcomeScreen.js which will redirect the user to the HomeScreen.js. From there, 
the user could choose to use camera or phone gallery to get results to buy
the same item or similar while also identifying the result. User is also able to 
see recent searches in the home screen which could be deleted or able to see
the results again.



## Downloading the following packages required if running code locally:
#used for stack and navigating through pages#
npm install --save react-native-navigation

#another navigation library#
npm install @react-navigation/native

#libraries used for viewing the pages and animations#
npm install expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

#Another library used for camera through the expo#
npm install expo install expo-camera
OR
npm install expo-camera

#assest path to image#
npm install expo install expo-asset

#sqlite sql database#
npm install expo install expo-sqlite@9.1.0

#expo image picker#
npm install expo install expo-image-picker
npm install @expo/react-native-action-sheet -S

#Animations#
npm install expo install lottie-react-native

