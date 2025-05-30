import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, UtensilsCrossed, ChevronRight, Calendar, ShoppingCart } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { fakeRecipeService } from '../services/fakeRecipeService';
import { Recipe } from '../types';
import Button from '../components/common/Button';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadFeaturedRecipes = async () => {
      try {
        setIsLoading(true);
        const recipes = await fakeRecipeService.getRecipes();
        // Get random 3 recipes for featured section
        const randomRecipes = recipes.sort(() => 0.5 - Math.random()).slice(0, 3);
        setFeaturedRecipes(randomRecipes);
      } catch (error) {
        console.error('Failed to load recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFeaturedRecipes();
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-md p-8 text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-lg opacity-90 mb-6">
            Ready to plan your meals for the week? Let's get started!
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/recipes">
              <Button 
                className="bg-white text-primary-600 hover:bg-gray-100"
                leftIcon={<Search size={18} />}
              >
                Find Recipes
              </Button>
            </Link>
            <Link to="/meal-planner">
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-primary-600"
                leftIcon={<Calendar size={18} />}
              >
                Plan Meals
              </Button>
            </Link>
            <Link to="/shopping-list">
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-primary-600"
                leftIcon={<ShoppingCart size={18} />}
              >
                Shopping List
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Quick Actions */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickActionCard 
            title="Find New Recipes"
            description="Discover recipes that match your taste and dietary preferences"
            icon={<Search size={24} className="text-primary-500" />}
            link="/recipes"
          />
          <QuickActionCard 
            title="Plan Your Week"
            description="Organize your meals for each day of the week"
            icon={<Calendar size={24} className="text-primary-500" />}
            link="/meal-planner"
          />
          <QuickActionCard 
            title="Create Shopping List"
            description="Generate a shopping list based on your meal plan"
            icon={<ShoppingCart size={24} className="text-primary-500" />}
            link="/shopping-list"
          />
        </div>
      </section>
      
      {/* Featured Recipes */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Featured Recipes</h2>
          <Link 
            to="/recipes" 
            className="text-primary-500 hover:text-primary-600 flex items-center text-sm font-medium"
          >
            View All
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 h-80 animate-pulse">
                <div className="w-full h-40 bg-gray-200 rounded-md mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="flex space-x-2">
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ title, description, icon, link }) => {
  return (
    <Link to={link} className="block">
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-start">
          <div className="mr-4">{icon}</div>
          <div>
            <h3 className="text-lg font-medium mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm font-medium text-gray-800">
          {recipe.calories} cal
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{recipe.title}</h3>
        <div className="flex items-center mb-3 text-gray-600 text-sm">
          <Clock size={16} className="mr-1" />
          <span>{recipe.prepTime + recipe.cookTime} min</span>
          <span className="mx-2">•</span>
          <UtensilsCrossed size={16} className="mr-1" />
          <span>{recipe.servings} servings</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline"
            className="flex-1"
          >
            View Recipe
          </Button>
          <Button 
            size="sm"
            className="flex-1"
          >
            Add to Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;