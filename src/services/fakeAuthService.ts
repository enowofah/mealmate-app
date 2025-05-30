import { User } from '../types';

// Simulated user storage
const USERS_STORAGE_KEY = 'mealmate_users';
const CURRENT_USER_KEY = 'mealmate_current_user';

// Helper functions to manage local storage
const getUsers = (): Record<string, User> => {
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : {};
};

const saveUsers = (users: Record<string, User>) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(CURRENT_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

const saveCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

// Simulated delay for async operations
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock auth service
export const fakeAuthService = {
  // Get current user (simulates checking auth state)
  getCurrentUser: async (): Promise<User | null> => {
    await delay(500); // Simulate network delay
    return getCurrentUser();
  },

  // Login with email and password
  login: async (email: string, password: string): Promise<User> => {
    await delay(1000); // Simulate network delay
    
    const users = getUsers();
    const user = Object.values(users).find(u => u.email === email);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // In a real app, we would verify the password here
    // For this demo, we'll just pretend it worked
    
    saveCurrentUser(user);
    return user;
  },

  // Sign up with email and password
  signUp: async (email: string, password: string, name: string): Promise<User> => {
    await delay(1000); // Simulate network delay
    
    const users = getUsers();
    
    // Check if email is already in use
    if (Object.values(users).some(u => u.email === email)) {
      throw new Error('Email already in use');
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      preferences: {
        dietaryRestrictions: [],
        allergies: [],
        measurementUnits: 'metric',
      },
    };
    
    // Save user
    users[newUser.id] = newUser;
    saveUsers(users);
    saveCurrentUser(newUser);
    
    return newUser;
  },

  // Login with Google (simulated)
  loginWithGoogle: async (): Promise<User> => {
    await delay(1000); // Simulate network delay
    
    // Create a mock Google user
    const googleUser: User = {
      id: `google_${Date.now().toString()}`,
      email: `user_${Date.now()}@gmail.com`,
      name: 'Google User',
      photoURL: 'https://via.placeholder.com/150',
      preferences: {
        dietaryRestrictions: [],
        allergies: [],
        measurementUnits: 'metric',
      },
    };
    
    // Save user
    const users = getUsers();
    users[googleUser.id] = googleUser;
    saveUsers(users);
    saveCurrentUser(googleUser);
    
    return googleUser;
  },

  // Logout
  logout: async (): Promise<void> => {
    await delay(500); // Simulate network delay
    saveCurrentUser(null);
  },

  // Update profile
  updateProfile: async (userId: string, userData: Partial<User>): Promise<User> => {
    await delay(1000); // Simulate network delay
    
    const users = getUsers();
    const user = users[userId];
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Update user data
    const updatedUser = { ...user, ...userData };
    users[userId] = updatedUser;
    
    // Save changes
    saveUsers(users);
    saveCurrentUser(updatedUser);
    
    return updatedUser;
  },
};