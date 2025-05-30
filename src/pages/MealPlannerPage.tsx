import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Calendar, Clock, Info, Plus, X, UtensilsCrossed, ShoppingCart } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useMealPlanStore } from '../store/useMealPlanStore';
import { fakeRecipeService } from '../services/fakeRecipeService';
import { Recipe, PlannedMeal } from '../types';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const MEAL_TYPES = ['breakfast', 'lunch', 'dinner'];

const MealPlannerPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { mealPlan, initializeMealPlan, addMealToDay, removeMealFromDay } = useMealPlanStore();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<string | null>(null);
  
  // Initialize meal plan if not exists
  useEffect(() => {
    if (user && !mealPlan) {
      initializeMealPlan(user.id);
    }
    
    // Load recipes
    const loadRecipes = async () => {
      try {
        setIsLoading(true);
        const allRecipes = await fakeRecipeService.getRecipes();
        setRecipes(allRecipes);
      } catch (error) {
        console.error('Failed to load recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadRecipes();
  }, [user, mealPlan, initializeMealPlan]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(date);
  };
  
  // Get day name
  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
  };
  
  // Open modal to add a meal
  const openAddMealModal = (day: string, mealType: string) => {
    setSelectedDay(day);
    setSelectedMealType(mealType);
    setIsModalOpen(true);
  };
  
  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
    setSelectedDay(null);
    setSelectedMealType(null);
  };
  
  // Add selected recipe to meal plan
  const addRecipeToMealPlan = () => {
    if (selectedRecipe && selectedDay && selectedMealType) {
      const meal: PlannedMeal = {
        id: `meal_${Date.now()}`,
        recipeId: selectedRecipe.id,
        servings: selectedRecipe.servings
      };
      
      addMealToDay(selectedDay, selectedMealType, meal);
      toast.success(`Added ${selectedRecipe.title} to ${selectedMealType}`);
      closeModal();
    }
  };
  
  // Remove meal from plan
  const removeMeal = (day: string, mealType: string) => {
    removeMealFromDay(day, mealType);
    toast.success(`Removed meal from ${mealType}`);
  };
  
  // Get recipe by ID
  const getRecipeById = (id: string) => {
    return recipes.find(recipe => recipe.id === id);
  };
  
  // Handle drag and drop
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    
    // Dropped outside valid area
    if (!destination) return;
    
    // Determine source/destination info
    const [sourceDay, sourceMealType] = source.droppableId.split('_');
    const [destDay, destMealType] = destination.droppableId.split('_');
    
    // Find meal in source day
    const mealPlanDay = mealPlan?.days.find(day => day.date === sourceDay);
    if (!mealPlanDay) return;
    
    const meal = mealPlanDay.meals[sourceMealType as keyof typeof mealPlanDay.meals] as PlannedMeal;
    if (!meal) return;
    
    // Remove from source
    removeMealFromDay(sourceDay, sourceMealType);
    
    // Add to destination
    addMealToDay(destDay, destMealType, meal);
    
    toast.success(`Moved meal to ${getDayName(destDay)}'s ${destMealType}`);
  };
  
  // Generate shopping list
  const generateShoppingList = () => {
    navigate('/shopping-list');
    toast.success('Generating shopping list based on your meal plan');
  };
  
  if (!mealPlan || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p>Loading your meal plan...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Weekly Meal Planner</h1>
          <p className="text-gray-600">
            Plan your meals for the week of {formatDate(mealPlan.weekStartDate)}
          </p>
        </div>
        <Button
          leftIcon={<ShoppingCart size={18} />}
          onClick={generateShoppingList}
        >
          Generate Shopping List
        </Button>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {mealPlan.days.map((day) => (
            <div key={day.date} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-primary-50 p-3 border-b border-primary-100">
                <h3 className="font-semibold text-primary-800">{getDayName(day.date)}</h3>
                <p className="text-xs text-gray-500">{formatDate(day.date)}</p>
              </div>
              
              <div className="p-3 space-y-4">
                {MEAL_TYPES.map((mealType) => {
                  const mealKey = mealType as keyof typeof day.meals;
                  const meal = day.meals[mealKey] as PlannedMeal | undefined;
                  const recipe = meal ? getRecipeById(meal.recipeId) : null;
                  
                  return (
                    <div key={mealType} className="space-y-2">
                      <h4 className="text-sm font-medium capitalize">{mealType}</h4>
                      
                      <Droppable droppableId={`${day.date}_${mealType}`}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`border rounded-md p-2 min-h-[80px] transition-colors ${
                              snapshot.isDraggingOver ? 'bg-primary-50 border-primary-200' : 'border-gray-200'
                            }`}
                          >
                            {meal && recipe ? (
                              <Draggable draggableId={`${day.date}_${mealType}_${meal.id}`} index={0}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="bg-white rounded border border-gray-200 p-2 shadow-sm"
                                  >
                                    <div className="flex justify-between items-start">
                                      <h5 className="text-sm font-medium line-clamp-1">{recipe.title}</h5>
                                      <button
                                        onClick={() => removeMeal(day.date, mealType)}
                                        className="text-gray-400 hover:text-red-500"
                                      >
                                        <X size={14} />
                                      </button>
                                    </div>
                                    <div className="flex items-center mt-1 text-xs text-gray-500">
                                      <Clock size={12} className="mr-1" />
                                      <span>{recipe.prepTime + recipe.cookTime} min</span>
                                      <span className="mx-1">•</span>
                                      <UtensilsCrossed size={12} className="mr-1" />
                                      <span>{meal.servings} servings</span>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ) : (
                              <button
                                onClick={() => openAddMealModal(day.date, mealType)}
                                className="w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-primary-500"
                              >
                                <Plus size={20} />
                                <span className="text-xs mt-1">Add Meal</span>
                              </button>
                            )}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
      
      {/* Add Meal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Add Meal to {selectedDay && getDayName(selectedDay)}'s {selectedMealType}</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recipes.map(recipe => (
                  <div 
                    key={recipe.id}
                    onClick={() => setSelectedRecipe(recipe)}
                    className={`border rounded-md p-3 cursor-pointer transition-colors ${
                      selectedRecipe?.id === recipe.id 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 hover:border-primary-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={recipe.imageUrl} 
                          alt={recipe.title}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium line-clamp-1">{recipe.title}</h4>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <Clock size={12} className="mr-1" />
                          <span>{recipe.prepTime + recipe.cookTime} min</span>
                          <span className="mx-1">•</span>
                          <UtensilsCrossed size={12} className="mr-1" />
                          <span>{recipe.servings} servings</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {recipe.tags.slice(0, 2).map((tag, index) => (
                            <span 
                              key={index} 
                              className="bg-primary-50 text-primary-700 text-xs px-1.5 py-0.5 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t bg-gray-50 flex justify-between">
              <div className="flex items-center text-gray-600 text-sm">
                <Info size={16} className="mr-1" />
                <span>Drag and drop meals to rearrange your plan</span>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={closeModal}>Cancel</Button>
                <Button 
                  onClick={addRecipeToMealPlan}
                  disabled={!selectedRecipe}
                >
                  Add to Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlannerPage;