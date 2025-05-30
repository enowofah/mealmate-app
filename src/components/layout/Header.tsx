import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UtensilsCrossed, ChevronDown, LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);
  
  const isAuthPage = location.pathname === '/auth';
  const isLandingPage = location.pathname === '/';
  
  // Toggle profile dropdown
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };
  
  // Close profile dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-menu') && isProfileMenuOpen) {
        setIsProfileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileMenuOpen]);
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-primary-500">
          <UtensilsCrossed size={28} />
          <span className="text-xl font-bold">MealMate</span>
        </Link>
        
        {/* Navigation */}
        {user && !isAuthPage && !isLandingPage && (
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/dashboard" active={location.pathname === '/dashboard'}>
              Dashboard
            </NavLink>
            <NavLink to="/recipes" active={location.pathname === '/recipes'}>
              Recipes
            </NavLink>
            <NavLink to="/meal-planner" active={location.pathname === '/meal-planner'}>
              Meal Planner
            </NavLink>
            <NavLink to="/shopping-list" active={location.pathname === '/shopping-list'}>
              Shopping List
            </NavLink>
          </nav>
        )}
        
        {/* Auth buttons */}
        {!user && (
          <div className="flex items-center space-x-4">
            {!isAuthPage && (
              <Link to="/auth">
                <Button variant="outline">Sign In</Button>
              </Link>
            )}
            {isLandingPage && (
              <Link to="/auth">
                <Button>Get Started</Button>
              </Link>
            )}
          </div>
        )}
        
        {/* User profile */}
        {user && (
          <div className="relative profile-menu">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-500 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden md:inline-block font-medium">{user.name}</span>
              <ChevronDown size={18} />
            </button>
            
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 animate-fade-in">
                <Link 
                  to="/profile" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <User size={16} className="mr-2" />
                  Profile
                </Link>
                <Link 
                  to="/profile/settings" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <Settings size={16} className="mr-2" />
                  Settings
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsProfileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => {
  return (
    <Link
      to={to}
      className={`text-sm font-medium hover:text-primary-500 transition-colors ${
        active ? 'text-primary-500' : 'text-gray-700'
      }`}
    >
      {children}
    </Link>
  );
};

export default Header;