import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import MealItem from "./MealItem";
import { useSelector } from "react-redux";
const MealsList = (props) =>
{
  const favoriteMeals  = useSelector(state=> state.meals.FavMeals)
  const renderMealItem = (itemData) =>
  {
    const isFavorite = favoriteMeals.some(meal=> meal.id === itemData.item.id)
    return (
      <MealItem
        title={itemData.item.title}
        onSelectMeal={() => {
          props.navigation.navigate({
            routeName: "MealDetails",
            params: {
              mealId: itemData.item.id,
              mealTitle: itemData.item.title,
              isFav: isFavorite 
            },
          });
        }}
        duration={itemData.item.duration}
        affordability={itemData.item.affordability}
        complexity={itemData.item.complexity}
        imageUrl={itemData.item.imageUrl}
      />
    );
  };
  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        keyExtractor={(item, idx) => item.id}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
});

export default MealsList;
