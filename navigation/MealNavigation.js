import React from "react";
import { Platform, Text } from "react-native";
import Colors from "../constant/Color";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import CategoriesScreen from "../screens/CatogoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FilterScreen from "../screens/FiltersScreen";
import { Ionicons } from "@expo/vector-icons";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor:
      // "#000000",
      Platform.OS === "android" ? Colors.primaryColor : "transparent",
  },
  headerTitleStyle: {
    fontFamily: "open-sans",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor:
    // "#fff",
    Platform.OS === "android" ? "#fff" : Colors.primaryColor,
};
const MealsNav = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
    },
    CategoryMeals: {
      screen: CategoryMealsScreen,
    },

    MealDetails: MealDetailsScreen,
  },
  {
    mode: "modal",
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const FavStack = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetails: MealDetailsScreen,
  },
  {
    mode: "modal",
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const tabScreenCofnig = {
  Meals: {
    screen: MealsNav,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="restaurant-outline"
            size={24}
            color={tabInfo.tintColor}
          />
        );
      },
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
        ) : (
          "Meals"
        ),
      tabBarColor: Colors.primaryColor,
    },
  },
  Favorites: {
    screen: FavStack,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="heart-outline" size={24} color={tabInfo.tintColor} />
        );
      },
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Favorites</Text>
        ) : (
          "Favorites"
        ),
      tabBarColor: Colors.accentColor,
    },
  },
};

const MealsFavTabNavigation =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenCofnig, {
        activeColor: "white",
        // shifting: true
        barStyle: {
          backgroundColor: Colors.primaryColor,
        },
      })
    : createBottomTabNavigator(tabScreenCofnig, {
        tabBarOptions: {
          activeTintColor: Colors.accentColor,
          tabStyle: {
            backgroundColor: "#000000",
            height: 86,
            paddingVertical: 20,
          },
        },
      });

const FiltersStackNav = createStackNavigator(
  { Filters: FilterScreen },
  {
    mode: "modal",
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigation,
      navigationOptions: {
        drawerLabel: "Meals",
      },
    },
    Filters: {
      screen: FiltersStackNav,
      navigationOptions: {
        drawerLabel: "Filters!",
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: "open-sans-bold",
      },
    },
  }
);
export default createAppContainer(MainNavigator);
