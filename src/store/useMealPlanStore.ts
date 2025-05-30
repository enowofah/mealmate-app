import { create } from 'zustand';
import { MealPlan, MealPlanDay, PlannedMeal } from '../types';

interface MealPlanState {
  mealPlan: MealPlan | null;
  loading: boolean;
  
  // Actions
  initializeMealPlan: (userId: string) => void;
  addMealToDay: (date: string, mealType: string, meal: PlannedMeal) => void;
  removeMealFromDay: (date: string, mealType: string) => void;
  clearMealPlan: () => void;
}

// Helper to get the current week's start date (Sunday)
const getCurrentWeekStartDate = (): string => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const diff = now.getDate() - dayOfWeek;
  const sunday = new Date(now.setDate(diff));
  return sunday.toISOString().split('T')[0];
};

// Helper to generate an array of 7 days starting from a given date
const generateWeekDays = (startDate: string): MealPlanDay[] => {
  const days: MealPlanDay[] = [];
  const start = new Date(startDate);
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    days.push({
      date: date.toISOString().split('T')[0],
      meals: {}
    });
  }
  
  return days;
};

export const useMealPlanStore = create<MealPlanState>((set, get) => ({
  mealPlan: null,
  loading: false,
  
  initializeMealPlan: (userId) => {
    const weekStartDate = getCurrentWeekStartDate();
    
    set({
      mealPlan: {
        id: `mp_${userId}_${weekStartDate}`,
        userId,
        weekStartDate,
        days: generateWeekDays(weekStartDate)
      },
      loading: false
    });
  },
  
  addMealToDay: (date, mealType, meal) => {
    const { mealPlan } = get();
    
    if (!mealPlan) return;
    
    const updatedDays = mealPlan.days.map(day => {
      if (day.date === date) {
        return {
          ...day,
          meals: {
            ...day.meals,
            [mealType]: meal
          }
        };
      }
      return day;
    });
    
    set({
      mealPlan: {
        ...mealPlan,
        days: updatedDays
      }
    });
  },
  
  removeMealFromDay: (date, mealType) => {
    const { mealPlan } = get();
    
    if (!mealPlan) return;
    
    const updatedDays = mealPlan.days.map(day => {
      if (day.date === date) {
        const updatedMeals = { ...day.meals };
        delete updatedMeals[mealType];
        
        return {
          ...day,
          meals: updatedMeals
        };
      }
      return day;
    });
    
    set({
      mealPlan: {
        ...mealPlan,
        days: updatedDays
      }
    });
  },
  
  clearMealPlan: () => {
    set({
      mealPlan: null
    });
  }
}));