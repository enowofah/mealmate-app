import { Recipe } from '../types';

// Mock recipes data
const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Vegetable Stir Fry',
    description: 'A quick and healthy vegetable stir fry with a savory sauce.',
    imageUrl: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800',
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    calories: 320,
    tags: ['vegetarian', 'quick', 'healthy'],
    ingredients: [
      { id: '1', name: 'Broccoli', amount: 2, unit: 'cups', category: 'vegetables' },
      { id: '2', name: 'Carrots', amount: 2, unit: 'medium', category: 'vegetables' },
      { id: '3', name: 'Bell Peppers', amount: 2, unit: 'medium', category: 'vegetables' },
      { id: '4', name: 'Soy Sauce', amount: 3, unit: 'tbsp', category: 'condiments' },
      { id: '5', name: 'Garlic', amount: 2, unit: 'cloves', category: 'produce' },
      { id: '6', name: 'Ginger', amount: 1, unit: 'tbsp', category: 'produce' },
      { id: '7', name: 'Vegetable Oil', amount: 2, unit: 'tbsp', category: 'oils' },
    ],
    instructions: [
      'Prepare all vegetables by washing and chopping them into bite-sized pieces.',
      'Heat oil in a large wok or frying pan over high heat.',
      'Add garlic and ginger, stir for 30 seconds until fragrant.',
      'Add vegetables and stir-fry for 5-7 minutes until crisp-tender.',
      'Add soy sauce and continue cooking for 1-2 minutes.',
      'Serve hot over rice or noodles if desired.'
    ],
  },
  {
    id: '2',
    title: 'Grilled Chicken Salad',
    description: 'Fresh and light grilled chicken salad with homemade dressing.',
    imageUrl: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=800',
    prepTime: 20,
    cookTime: 15,
    servings: 2,
    calories: 450,
    tags: ['high-protein', 'low-carb', 'lunch'],
    ingredients: [
      { id: '1', name: 'Chicken Breast', amount: 2, unit: 'pieces', category: 'meat' },
      { id: '2', name: 'Mixed Greens', amount: 4, unit: 'cups', category: 'vegetables' },
      { id: '3', name: 'Cherry Tomatoes', amount: 1, unit: 'cup', category: 'vegetables' },
      { id: '4', name: 'Cucumber', amount: 1, unit: 'medium', category: 'vegetables' },
      { id: '5', name: 'Olive Oil', amount: 2, unit: 'tbsp', category: 'oils' },
      { id: '6', name: 'Lemon Juice', amount: 1, unit: 'tbsp', category: 'condiments' },
      { id: '7', name: 'Salt', amount: 1, unit: 'tsp', category: 'spices' },
      { id: '8', name: 'Black Pepper', amount: 0.5, unit: 'tsp', category: 'spices' },
    ],
    instructions: [
      'Season chicken breasts with salt and pepper.',
      'Grill chicken for 6-7 minutes per side until fully cooked.',
      'Let chicken rest for 5 minutes, then slice.',
      'In a large bowl, combine mixed greens, tomatoes, and cucumber.',
      'Whisk together olive oil and lemon juice for the dressing.',
      'Top salad with sliced chicken and drizzle with dressing.',
      'Season with additional salt and pepper if desired.'
    ],
  },
  {
    id: '3',
    title: 'Chocolate Chip Cookies',
    description: 'Classic homemade chocolate chip cookies that are soft and chewy.',
    imageUrl: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=800',
    prepTime: 15,
    cookTime: 10,
    servings: 24,
    calories: 180,
    tags: ['dessert', 'baking', 'treats'],
    ingredients: [
      { id: '1', name: 'Butter', amount: 1, unit: 'cup', category: 'dairy' },
      { id: '2', name: 'Brown Sugar', amount: 1, unit: 'cup', category: 'baking' },
      { id: '3', name: 'White Sugar', amount: 0.5, unit: 'cup', category: 'baking' },
      { id: '4', name: 'Eggs', amount: 2, unit: 'large', category: 'dairy' },
      { id: '5', name: 'Vanilla Extract', amount: 2, unit: 'tsp', category: 'baking' },
      { id: '6', name: 'All-Purpose Flour', amount: 2.75, unit: 'cups', category: 'baking' },
      { id: '7', name: 'Baking Soda', amount: 1, unit: 'tsp', category: 'baking' },
      { id: '8', name: 'Salt', amount: 0.5, unit: 'tsp', category: 'spices' },
      { id: '9', name: 'Chocolate Chips', amount: 2, unit: 'cups', category: 'baking' },
    ],
    instructions: [
      'Preheat oven to 375°F (190°C).',
      'In a large bowl, cream together butter and sugars until light and fluffy.',
      'Beat in eggs one at a time, then stir in vanilla.',
      'In a separate bowl, combine flour, baking soda, and salt.',
      'Gradually add dry ingredients to the wet mixture and mix well.',
      'Fold in chocolate chips.',
      'Drop by rounded tablespoons onto ungreased baking sheets.',
      'Bake for 8-10 minutes or until edges are lightly browned.',
      'Cool on baking sheets for 2 minutes before transferring to wire racks.'
    ],
  },
  {
    id: '4',
    title: 'Salmon with Roasted Vegetables',
    description: 'Oven-baked salmon fillet with colorful roasted vegetables.',
    imageUrl: 'https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg?auto=compress&cs=tinysrgb&w=800',
    prepTime: 15,
    cookTime: 25,
    servings: 2,
    calories: 520,
    tags: ['seafood', 'healthy', 'dinner', 'high-protein'],
    ingredients: [
      { id: '1', name: 'Salmon Fillet', amount: 2, unit: 'pieces', category: 'seafood' },
      { id: '2', name: 'Zucchini', amount: 1, unit: 'medium', category: 'vegetables' },
      { id: '3', name: 'Bell Peppers', amount: 2, unit: 'medium', category: 'vegetables' },
      { id: '4', name: 'Red Onion', amount: 1, unit: 'medium', category: 'vegetables' },
      { id: '5', name: 'Cherry Tomatoes', amount: 1, unit: 'cup', category: 'vegetables' },
      { id: '6', name: 'Olive Oil', amount: 2, unit: 'tbsp', category: 'oils' },
      { id: '7', name: 'Lemon', amount: 1, unit: 'medium', category: 'produce' },
      { id: '8', name: 'Garlic', amount: 2, unit: 'cloves', category: 'produce' },
      { id: '9', name: 'Dill', amount: 2, unit: 'tbsp', category: 'herbs' },
      { id: '10', name: 'Salt', amount: 1, unit: 'tsp', category: 'spices' },
      { id: '11', name: 'Black Pepper', amount: 0.5, unit: 'tsp', category: 'spices' },
    ],
    instructions: [
      'Preheat oven to 400°F (200°C).',
      'Chop all vegetables into bite-sized pieces.',
      'Toss vegetables with 1 tbsp olive oil, salt, and pepper.',
      'Spread vegetables on a baking sheet and roast for 15 minutes.',
      'Meanwhile, season salmon with salt, pepper, and dill.',
      'Push vegetables to the sides of the baking sheet and place salmon in the center.',
      'Drizzle salmon with remaining olive oil and lemon juice.',
      'Return to oven and bake for an additional 10-12 minutes until salmon is cooked through.',
      'Garnish with fresh dill and lemon wedges before serving.'
    ],
  },
  {
    id: '5',
    title: 'Vegetarian Pasta Primavera',
    description: 'Light and colorful pasta dish loaded with spring vegetables.',
    imageUrl: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=800',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    calories: 380,
    tags: ['vegetarian', 'pasta', 'dinner'],
    ingredients: [
      { id: '1', name: 'Penne Pasta', amount: 12, unit: 'oz', category: 'pasta' },
      { id: '2', name: 'Asparagus', amount: 1, unit: 'bunch', category: 'vegetables' },
      { id: '3', name: 'Cherry Tomatoes', amount: 1, unit: 'cup', category: 'vegetables' },
      { id: '4', name: 'Yellow Squash', amount: 1, unit: 'medium', category: 'vegetables' },
      { id: '5', name: 'Zucchini', amount: 1, unit: 'medium', category: 'vegetables' },
      { id: '6', name: 'Red Bell Pepper', amount: 1, unit: 'medium', category: 'vegetables' },
      { id: '7', name: 'Garlic', amount: 3, unit: 'cloves', category: 'produce' },
      { id: '8', name: 'Olive Oil', amount: 3, unit: 'tbsp', category: 'oils' },
      { id: '9', name: 'Parmesan Cheese', amount: 0.5, unit: 'cup', category: 'dairy' },
      { id: '10', name: 'Basil', amount: 0.25, unit: 'cup', category: 'herbs' },
      { id: '11', name: 'Salt', amount: 1, unit: 'tsp', category: 'spices' },
      { id: '12', name: 'Black Pepper', amount: 0.5, unit: 'tsp', category: 'spices' },
    ],
    instructions: [
      'Cook pasta according to package directions until al dente. Drain and set aside.',
      'Prepare all vegetables: trim asparagus, halve tomatoes, and dice squash, zucchini, and bell pepper.',
      'In a large skillet, heat olive oil over medium-high heat.',
      'Add garlic and sauté for 30 seconds until fragrant.',
      'Add asparagus, squash, zucchini, and bell pepper. Cook for 5-7 minutes until tender-crisp.',
      'Add cherry tomatoes and cook for another 2 minutes.',
      'Add cooked pasta to the skillet and toss to combine.',
      'Season with salt and pepper.',
      'Remove from heat and stir in fresh basil.',
      'Serve topped with grated Parmesan cheese.'
    ],
  },
  {
    id: '6',
    title: 'Berry Smoothie Bowl',
    description: 'Nutritious and delicious smoothie bowl topped with fresh fruits and granola.',
    imageUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800',
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    calories: 320,
    tags: ['breakfast', 'vegetarian', 'quick', 'healthy'],
    ingredients: [
      { id: '1', name: 'Frozen Mixed Berries', amount: 1, unit: 'cup', category: 'frozen' },
      { id: '2', name: 'Banana', amount: 1, unit: 'medium', category: 'produce' },
      { id: '3', name: 'Greek Yogurt', amount: 0.5, unit: 'cup', category: 'dairy' },
      { id: '4', name: 'Almond Milk', amount: 0.25, unit: 'cup', category: 'dairy' },
      { id: '5', name: 'Honey', amount: 1, unit: 'tbsp', category: 'condiments' },
      { id: '6', name: 'Granola', amount: 0.25, unit: 'cup', category: 'cereal' },
      { id: '7', name: 'Fresh Berries', amount: 0.25, unit: 'cup', category: 'produce' },
      { id: '8', name: 'Chia Seeds', amount: 1, unit: 'tsp', category: 'baking' },
    ],
    instructions: [
      'In a blender, combine frozen berries, banana, Greek yogurt, almond milk, and honey.',
      'Blend until smooth and creamy. The mixture should be thick enough to eat with a spoon.',
      'Pour into a bowl.',
      'Top with granola, fresh berries, and chia seeds.',
      'Serve immediately and enjoy with a spoon!'
    ],
  },
];

// Simulated delay for async operations
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock recipe service
export const fakeRecipeService = {
  // Get all recipes
  getRecipes: async (): Promise<Recipe[]> => {
    await delay(800);
    return [...mockRecipes];
  },

  // Get recipe by ID
  getRecipeById: async (id: string): Promise<Recipe | undefined> => {
    await delay(500);
    return mockRecipes.find(recipe => recipe.id === id);
  },

  // Search recipes
  searchRecipes: async (query: string, tags: string[] = []): Promise<Recipe[]> => {
    await delay(800);
    
    const searchTerms = query.toLowerCase().trim();
    
    if (!searchTerms && tags.length === 0) {
      return [...mockRecipes];
    }
    
    return mockRecipes.filter(recipe => {
      // Filter by search terms
      const matchesSearch = !searchTerms || 
        recipe.title.toLowerCase().includes(searchTerms) || 
        recipe.description.toLowerCase().includes(searchTerms) ||
        recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchTerms));
      
      // Filter by tags
      const matchesTags = tags.length === 0 || 
        tags.every(tag => recipe.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  },
};