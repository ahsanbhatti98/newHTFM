import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { Images, Metrics, Colors, Fonts, AppStyles } from "../../theme";

// Screens
import {
  Dashboard,
  Favorites,
  History,
  Profile,
  Logout,
} from "../../containers";
import { createStackNavigator } from "@react-navigation/stack";

//Screen names
const homeName = "Home";
const historyName = "History";
const favouritesName = "Favourites";
const profileName = "Profile";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const defaultScreenOptions = (transparent = false) => {
  return {
    headerTitleStyle: {
      fontSize: Metrics.generatedFontSize(20),
      fontFamily: Fonts.Type.Bold,
      color: Colors.primary.white,
    },

    headerTransparent: transparent,
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: Colors.primary.theme,
      borderBottomWidth: 0,
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS
    },
  };
};

const DashBoardStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Dashboard"
      component={Dashboard}
      // options={{
      //   title: "Search",
      //   ...defaultScreenOptions(),
      // }}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const HistoryStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="History"
      component={History}
      options={{
        title: "History",
        ...defaultScreenOptions(),
      }}
    />
  </Stack.Navigator>
);

const FavoritesStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Favorites"
      component={Favorites}
      options={{
        title: "Favorites",
        ...defaultScreenOptions(),
      }}
    />
  </Stack.Navigator>
);

const ProfileStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        title: "Profile",
        ...defaultScreenOptions(),
      }}
    />
  </Stack.Navigator>
);

// const LogoutStack = ({ navigation }) => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="Logout"
//       component={Logout}
//       options={{
//         headerShown: false,
//       }}
//     />
//   </Stack.Navigator>
// );

export default BottomTab = () => (
  <Tab.Navigator
    initialRouteName="DashBoardStack"
    backBehavior={"initialRoute"}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let rn = route.name;

        if (rn === homeName) {
          iconName = focused ? Images.ic_home_active : Images.ic_home_in;
        } else if (rn === historyName) {
          iconName = focused ? Images.ic_history_active : Images.ic_history_in;
        } else if (rn === favouritesName) {
          iconName = focused
            ? Images.ic_favorite_active
            : Images.ic_favorite_in;
        } else if (rn === profileName) {
          iconName = focused ? Images.ic_user_active : Images.ic_user_in;
        }

        // You can return any component that you like here!
        return (
          <Image
            resizeMode="contain"
            source={iconName}
            style={{
              width: 24,
              height: 20,
            }}
          />
        );
      },
    })}
    tabBarOptions={{
      activeTintColor: "#3283E6",
      inactiveTintColor: "grey",
      labelStyle: { paddingBottom: 10, fontSize: 10 },
      style: { padding: 10, height: 60 },
    }}
  >
    <Tab.Screen
      name={homeName}
      component={DashBoardStack}
      options={{
        tabBarLabel: "Search",
      }}
    />
    <Tab.Screen
      name={historyName}
      component={HistoryStack}
      options={{
        tabBarLabel: "History",
      }}
    />
    <Tab.Screen
      name={favouritesName}
      component={FavoritesStack}
      options={{
        tabBarLabel: "Favorites",
      }}
    />
    <Tab.Screen
      name={profileName}
      component={ProfileStack}
      options={{
        tabBarLabel: "Profile",
      }}
    />
  </Tab.Navigator>
);
