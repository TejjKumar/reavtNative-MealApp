import React from "react";
import { View, StyleSheet } from "react-native";
import MealsList from "../components/MealsLits";
import { useSelector } from "react-redux";
import { CATEGORIES } from "../data/dummy-data";
import DefaultText from "../components/DefaultText";
const CatogoryMealScreen = (props) => {
  const catId = props.navigation.getParam("categoryId");

  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const disaplayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );
  if (disaplayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found, check your filters</DefaultText>
      </View>
    );
  }
  return <MealsList listData={disaplayedMeals} navigation={props.navigation} />;
};

CatogoryMealScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CatogoryMealScreen;
