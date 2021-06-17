import React from "react";
import MealsList from "../components/MealsLits";

import { CATEGORIES, MEALS } from "../data/dummy-data";
const CatogoryMealScreen = (props) => {
  const catId = props.navigation.getParam("categoryId");
  const disaplayedMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );
  return <MealsList listData={disaplayedMeals} navigation={props.navigation} />;
};

CatogoryMealScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
  return {
    headerTitle: selectedCategory.title,
  };
};

export default CatogoryMealScreen;
