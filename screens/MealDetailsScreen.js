import React, { useEffect, useCallback } from "react";
import {
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import Colors from "../constant/Color";
import { Ionicons } from "@expo/vector-icons";
import { toggleFavorite } from "../store/actions/meals";
const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetialScreen = (props) => {
  const availableMeals = useSelector((state) => state.meals.meals);
  const mealId = props.navigation.getParam("mealId");
  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);
  const currentIsfavoriteMeal = useSelector((state) =>
    state.meals.FavMeals.some((meal) => meal.id === mealId)
  );

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentIsfavoriteMeal });
  }, [currentIsfavoriteMeal]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name="timer-outline"
            color={Colors.accentColor}
            size={22}
            style={{ right: 12 }}
          />
          <DefaultText>{selectedMeal.duration} min</DefaultText>
        </View>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ing) => (
        <ListItem key={ing}>{ing}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetialScreen.navigationOptions = (navigationData) => {
  const mealId = navigationData.navigation.getParam("mealId");
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const toggleFavorite = navigationData.navigation.getParam("toggleFav");
  const isFavorite = navigationData.navigation.getParam("isFav");
  console.log("meal title", mealTitle);
  // const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  return {
    headerTitle: mealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? "ios-star" : "ios-star-outline"}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    marginHorizontal: 20,
    marginVertical: 10,
    fontFamily: "open-sans",
    // textAlign: "center",
    color: Colors.primaryColor,
    fontSize: 22,
  },
  listItem: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderColor: "#cccccc",
    borderWidth: 0.5,
    padding: 10,
  },
});

export default MealDetialScreen;
