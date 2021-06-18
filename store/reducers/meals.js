import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITES, SET_FILTERS } from "../actions/meals";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  FavMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITES:
      const existingIndex = state.FavMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.FavMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return { ...state, FavMeals: updatedFavMeals };
      } else {
        const meal = state.meals.find((meal) => meal.id === action.mealId);
        return { ...state, FavMeals: state.FavMeals.concat(meal) };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedFilteredMeals = state.meals.filter((meal) => {
        if (appliedFilters.glutenFree && !meal.isGultenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilters.vegetarian && !meal.isVegetarian) {
          return false;
        }
        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }
        return true;
      });
      return { ...state, filteredMeals: updatedFilteredMeals };
    default:
      return state;
  }
};

export default mealsReducer;
