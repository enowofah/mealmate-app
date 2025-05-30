import React, { useState, useEffect } from 'react';
import { Check, Trash, ShoppingCart, Plus, Download, FileText, RefreshCw } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useMealPlanStore } from '../store/useMealPlanStore';
import { useShoppingListStore } from '../store/useShoppingListStore';
import { fakeRecipeService } from '../services/fakeRecipeService';
import { Recipe, ShoppingListItem } from '../types';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import toast from 'react-hot-toast';

const ShoppingListPage: React.FC = () => {
  const { user } = useAuth();
  const { mealPlan } = useMealPlanStore();
  const { 
    shoppingList, 
    generateShoppingList, 
    toggleItemChecked, 
    addCustomItem, 
    removeItem 
  } = useShoppingListStore();
  
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    amount: 1,
    unit: '',
    category: 'other'
  });
  
  // Load recipes and generate shopping list
  useEffect(() => {
    const loadData = async () => {
      if (!user || !mealPlan) return;
      
      try {
        setIsLoading(true);
        const allRecipes = await fakeRecipeService.getRecipes();
        setRecipes(allRecipes);
        
        // Generate shopping list if not exists
        if (!shoppingList) {
          generateShoppingList(user.id, mealPlan, allRecipes);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
        toast.error('Failed to load shopping list data');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user, mealPlan, shoppingList, generateShoppingList]);
  
  // Regenerate shopping list
  const handleRegenerateList = () => {
    if (!user || !mealPlan || !recipes.length) return;
    
    generateShoppingList(user.id, mealPlan, recipes);
    toast.success('Shopping list regenerated');
  };
  
  // Handle adding custom item
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newItem.name.trim() === '') {
      toast.error('Item name is required');
      return;
    }
    
    addCustomItem({
      name: newItem.name.trim(),
      amount: newItem.amount,
      unit: newItem.unit.trim(),
      category: newItem.category
    });
    
    // Reset form
    setNewItem({
      name: '',
      amount: 1,
      unit: '',
      category: 'other'
    });
    setShowAddItem(false);
    
    toast.success('Item added to shopping list');
  };
  
  // Export shopping list
  const exportShoppingList = () => {
    if (!shoppingList) return;
    
    // Group items by category
    const itemsByCategory: Record<string, ShoppingListItem[]> = {};
    
    shoppingList.items.forEach(item => {
      if (!itemsByCategory[item.category]) {
        itemsByCategory[item.category] = [];
      }
      itemsByCategory[item.category].push(item);
    });
    
    // Build text content
    let content = `MealMate Shopping List - ${new Date().toLocaleDateString()}\n\n`;
    
    Object.entries(itemsByCategory).forEach(([category, items]) => {
      content += `=== ${category.toUpperCase()} ===\n`;
      
      items.forEach(item => {
        content += `${item.checked ? '✓ ' : '□ '}${item.amount} ${item.unit} ${item.name}\n`;
      });
      
      content += '\n';
    });
    
    // Create download link
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shopping-list-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Shopping list exported');
  };
  
  // Get the count of checked items
  const getCheckedItemsCount = () => {
    if (!shoppingList) return 0;
    return shoppingList.items.filter(item => item.checked).length;
  };
  
  // Get progress percentage
  const getProgressPercentage = () => {
    if (!shoppingList || shoppingList.items.length === 0) return 0;
    return Math.round((getCheckedItemsCount() / shoppingList.items.length) * 100);
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p>Generating your shopping list...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!mealPlan) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Meal Plan Found</h2>
          <p className="text-gray-600 mb-6">
            You need to create a meal plan before generating a shopping list.
          </p>
          <Button href="/meal-planner">
            Create Meal Plan
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Shopping List</h1>
          <p className="text-gray-600">
            Based on your meal plan for the week of {new Date(mealPlan.weekStartDate).toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="outline" 
            leftIcon={<RefreshCw size={18} />}
            onClick={handleRegenerateList}
          >
            Regenerate
          </Button>
          <Button 
            variant="outline" 
            leftIcon={<Download size={18} />}
            onClick={exportShoppingList}
            disabled={!shoppingList || shoppingList.items.length === 0}
          >
            Export List
          </Button>
          <Button 
            leftIcon={<Plus size={18} />}
            onClick={() => setShowAddItem(true)}
          >
            Add Item
          </Button>
        </div>
      </div>
      
      {/* Progress bar */}
      {shoppingList && shoppingList.items.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Shopping Progress</h3>
            <span className="text-sm text-gray-600">
              {getCheckedItemsCount()} of {shoppingList.items.length} items
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary-500 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Shopping List */}
      {shoppingList && shoppingList.items.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Group items by category */}
          {Array.from(new Set(shoppingList.items.map(item => item.category))).map(category => (
            <div key={category} className="border-b last:border-b-0">
              <div className="bg-gray-50 px-4 py-2 border-b">
                <h3 className="font-medium capitalize">{category}</h3>
              </div>
              <ul className="divide-y divide-gray-100">
                {shoppingList.items
                  .filter(item => item.category === category)
                  .map(item => (
                    <li key={item.id} className="px-4 py-3 flex items-center">
                      <button
                        onClick={() => toggleItemChecked(item.id)}
                        className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center mr-3 ${
                          item.checked 
                            ? 'bg-primary-500 border-primary-500 text-white' 
                            : 'border-gray-300'
                        }`}
                      >
                        {item.checked && <Check size={12} />}
                      </button>
                      <div className="flex-grow">
                        <span className={`${item.checked ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                          {item.amount} {item.unit} {item.name}
                        </span>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 ml-2"
                      >
                        <Trash size={16} />
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <FileText size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">Your shopping list is empty</h3>
          <p className="text-gray-600 mb-6">
            Add items manually or regenerate based on your meal plan.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="outline"
              onClick={handleRegenerateList}
            >
              Regenerate from Meal Plan
            </Button>
            <Button 
              onClick={() => setShowAddItem(true)}
            >
              Add Item Manually
            </Button>
          </div>
        </div>
      )}
      
      {/* Add Item Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Add Item to Shopping List</h2>
            </div>
            
            <form onSubmit={handleAddItem}>
              <div className="p-4 space-y-4">
                <Input
                  label="Item Name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="e.g., Apples"
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Amount"
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={newItem.amount}
                    onChange={(e) => setNewItem({ ...newItem, amount: parseFloat(e.target.value) })}
                    required
                  />
                  
                  <Input
                    label="Unit"
                    value={newItem.unit}
                    onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                    placeholder="e.g., lbs, oz, pieces"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="produce">Produce</option>
                    <option value="dairy">Dairy</option>
                    <option value="meat">Meat</option>
                    <option value="seafood">Seafood</option>
                    <option value="bakery">Bakery</option>
                    <option value="canned goods">Canned Goods</option>
                    <option value="dry goods">Dry Goods</option>
                    <option value="frozen">Frozen</option>
                    <option value="spices">Spices</option>
                    <option value="condiments">Condiments</option>
                    <option value="beverages">Beverages</option>
                    <option value="snacks">Snacks</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="p-4 border-t bg-gray-50 flex justify-end space-x-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddItem(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Add Item
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingListPage;