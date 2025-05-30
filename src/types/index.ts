// User types
export interface User {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  allergies: string[];
  measurementUnits: 'metric' | 'imperial';
}

// Recipe types
export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  calories: number;
  tags: string[];
  ingredients: Ingredient[];
  instructions: string[];
  source?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category: string;
}

// Meal planning types
export interface MealPlan {
  id: string;
  userId: string;
  weekStartDate: string;
  days: MealPlanDay[];
}

export interface MealPlanDay {
  date: string;
  meals: {
    breakfast?: PlannedMeal;
    lunch?: PlannedMeal;
    dinner?: PlannedMeal;
    snacks?: PlannedMeal[];
  };
}

export interface PlannedMeal {
  id: string;
  recipeId: string;
  servings: number;
}

// Shopping list types
export interface ShoppingListItem {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category: string;
  checked: boolean;
  recipeIds: string[];
}

export interface ShoppingList {
  id: string;
  userId: string;
  weekStartDate: string;
  items: ShoppingListItem[];
}