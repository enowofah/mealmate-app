import { create } from 'zustand';
import { ShoppingList, ShoppingListItem, Recipe, Ingredient, MealPlan } from '../types';

interface ShoppingListState {
  shoppingList: ShoppingList | null;
  loading: boolean;
  
  // Actions
  generateShoppingList: (userId: string, mealPlan: MealPlan, recipes: Recipe[]) => void;
  toggleItemChecked: (itemId: string) => void;
  clearShoppingList: () => void;
  addCustomItem: (item: Omit<ShoppingListItem, 'id' | 'checked' | 'recipeIds'>) => void;
  removeItem: (itemId: string) => void;
}

// Helper to generate a shopping list from a meal plan
const generateShoppingListFromMealPlan = (
  userId: string,
  mealPlan: MealPlan,
  recipes: Recipe[]
): ShoppingList => {
  // Create a map to combine ingredients by name and unit
  const ingredientMap: Record<string, ShoppingListItem> = {};
  
  // Loop through each day and meal
  mealPlan.days.forEach(day => {
    // Process each meal type (breakfast, lunch, dinner)
    Object.entries(day.meals).forEach(([_, plannedMeal]) => {
      if (!plannedMeal) return;
      
      // Find the recipe
      const recipe = recipes.find(r => r.id === plannedMeal.recipeId);
      if (!recipe) return;
      
      // Process each ingredient
      recipe.ingredients.forEach(ingredient => {
        const key = `${ingredient.name}_${ingredient.unit}`;
        
        if (ingredientMap[key]) {
          // Ingredient already exists, update amount and add recipe ID
          ingredientMap[key].amount += ingredient.amount * plannedMeal.servings / recipe.servings;
          if (!ingredientMap[key].recipeIds.includes(recipe.id)) {
            ingredientMap[key].recipeIds.push(recipe.id);
          }
        } else {
          // New ingredient
          ingredientMap[key] = {
            id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: ingredient.name,
            amount: ingredient.amount * plannedMeal.servings / recipe.servings,
            unit: ingredient.unit,
            category: ingredient.category,
            checked: false,
            recipeIds: [recipe.id]
          };
        }
      });
    });
  });
  
  // Convert map to array and sort by category
  const items = Object.values(ingredientMap).sort((a, b) => 
    a.category.localeCompare(b.category)
  );
  
  return {
    id: `sl_${userId}_${mealPlan.weekStartDate}`,
    userId,
    weekStartDate: mealPlan.weekStartDate,
    items
  };
};

export const useShoppingListStore = create<ShoppingListState>((set, get) => ({
  shoppingList: null,
  loading: false,
  
  generateShoppingList: (userId, mealPlan, recipes) => {
    set({ loading: true });
    
    // Generate shopping list from meal plan
    const shoppingList = generateShoppingListFromMealPlan(userId, mealPlan, recipes);
    
    set({
      shoppingList,
      loading: false
    });
  },
  
  toggleItemChecked: (itemId) => {
    const { shoppingList } = get();
    
    if (!shoppingList) return;
    
    const updatedItems = shoppingList.items.map(item => 
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    
    set({
      shoppingList: {
        ...shoppingList,
        items: updatedItems
      }
    });
  },
  
  clearShoppingList: () => {
    set({ shoppingList: null });
  },
  
  addCustomItem: (item) => {
    const { shoppingList } = get();
    
    if (!shoppingList) return;
    
    const newItem: ShoppingListItem = {
      ...item,
      id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      checked: false,
      recipeIds: []
    };
    
    set({
      shoppingList: {
        ...shoppingList,
        items: [...shoppingList.items, newItem]
      }
    });
  },
  
  removeItem: (itemId) => {
    const { shoppingList } = get();
    
    if (!shoppingList) return;
    
    set({
      shoppingList: {
        ...shoppingList,
        items: shoppingList.items.filter(item => item.id !== itemId)
      }
    });
  }
}));