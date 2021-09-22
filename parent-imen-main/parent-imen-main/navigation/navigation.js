import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconFontisto from "react-native-vector-icons/Fontisto";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import IconFoundation from "react-native-vector-icons/Foundation";
import Landing from "../screens/landing";
import JardinDetail from "../screens/jardin-detail";
import UpdateProfile from "../screens/Update-profile";

const LandingNav = createStackNavigator(
  {
    Landing: Landing,
    JardinDetail: JardinDetail,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0086c3",
      },
      headerTintColor: "white",
    },
  }
);

const ProfileNav = createStackNavigator(
  {
    UpdateProfile: UpdateProfile,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0086c3",
      },
      headerTintColor: "white",
    },
  }
);

const AppNav = createMaterialBottomTabNavigator(
  {
    Acceuil: {
      screen: LandingNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <IconFontAwesome name="list-ol" size={25} color="#fafafa" />;
        },
        tabBarColor: "#0086c3",
      },
    },
    Profile: {
      screen: ProfileNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <IconFontisto name="person" size={25} color="#fafafa" />;
        },
        tabBarColor: "#0086c3",
      },
    },
  },
  {
    activeColor: "white",
    shifting: true,
  }
);

export default createAppContainer(AppNav);