import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import HomeScreen from "./app/screens/HomeScreen";
import cameraScreen from "./app/screens/cameraScreen";
import ResultScreen from "./app/screens/ResultScreen";
import ResultScreenDB from "./app/screens/ResultScreenDB";

import AppText from "./app/components/AppText";
import HeadingText from "./app/components/HeadingText";
import RecentItemCard from "./app/components/RecentItemCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "./app/components/Screen";
import Icon from "./app/components/Icon";
import ItemLink from "./app/components/ItemLink";
import Card from "./app/components/Card";

import * as imgDB from "./database/SQLiteDB";

// stack of pages
const Stack = createStackNavigator();

function App() {
  //Comment out the reset after first run
  // imgDB.database.reset();
  imgDB.database.dbinit();

  // imgDB.database.limittrigger();
  // //test retrieving all items
  // imgDB.database.getRecentItem(-1);
  // imgDB.database.getItemDetails(-1);
  imgDB.database.limittrigger();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="cameraScreen"
          component={cameraScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResultScreen"
          component={ResultScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResultScreenDB"
          component={ResultScreenDB}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

// // Used to test screens
// export default function App() {
//   return <HomeScreen />;
// }
