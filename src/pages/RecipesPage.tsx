import React, { useState, useEffect } from 'react';
import { Search, Filter, X, Clock, UtensilsCrossed } from 'lucide-react';
import { fakeRecipeService } from '../services/fakeRecipeService';
import { Recipe } from '../types';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const RecipesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // All available tags from recipes
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setIsLoading(true);
        const allRecipes = await fakeRecipeService.getRecipes();
        setRecipes(allRecipes);
        setFilteredRecipes(allRecipes);
        
        // Extract all unique tags
        const tags = Array.from(
          new Set(allRecipes.flatMap(recipe => recipe.tags))
        ).sort();
        setAvailableTags(tags);
      } catch (error) {
        console.error('Failed to load recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadRecipes();
  }, []);
  
  // Filter recipes when search query or tags change
  useEffect(() => {
    const filterRecipes = async () => {
      try {
        setIsLoading(true);
        const results = await fakeRecipeService.searchRecipes(searchQuery, selectedTags);
        setFilteredRecipes(results);
      } catch (error) {
        console.error('Failed to search recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    filterRecipes();
  }, [searchQuery, selectedTags]);
  
  // Toggle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Recipe Explorer</h1>
        <p className="text-gray-600">
          Discover delicious recipes for every occasion and dietary preference
        </p>
      </div>
      
      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-grow">
            <Input
              placeholder="Search for recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={18} />}
              rightIcon={
                searchQuery ? (
                  <button onClick={() => setSearchQuery('')}>
                    <X size={18} />
                  </button>
                ) : null
              }
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            leftIcon={<Filter size={18} />}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4 animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Filter by Tags</h3>
              {selectedTags.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-500 hover:text-primary-600"
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Active filters */}
        {selectedTags.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-600">Active filters:</span>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map(tag => (
                <span
                  key={tag}
                  className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs flex items-center"
                >
                  {tag}
                  <button
                    onClick={() => toggleTag(tag)}
                    className="ml-1 focus:outline-none"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Recipe Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
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
      ) : filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No recipes found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
          <Button onClick={clearFilters}>Clear All Filters</Button>
        </div>
      )}
    </div>
  );
};

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div 
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
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
          {recipe.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{recipe.tags.length - 3} more</span>
          )}
        </div>
        
        <div className={`overflow-hidden transition-all duration-300 mb-4 ${showDetails ? 'max-h-24' : 'max-h-0'}`}>
          <p className="text-sm text-gray-600 line-clamp-3">
            {recipe.description}
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline"
            className="flex-1"
          >
            View Details
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

export default RecipesPage;