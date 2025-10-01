import React, { useState } from 'react';
import { ShoppingCart, User, Search, Menu, Moon, Sun, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onAuthClick: () => void;
  onCartClick: () => void;
  onCategoryClick: (categoryId: string | null) => void;
  onProfileClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onAuthClick,
  onCartClick,
  onCategoryClick,
  onProfileClick,
  searchQuery,
  onSearchChange
}) => {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const cartCount = getCartCount();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onCategoryClick(null)}>
            <img 
  src="image/logo.png"   // path to your logo
  alt="DailyHunt Logo" 
  className="w-10 h-10 object-contain"
/>
            <h1 className="text-2xl  text-gray-900 dark:text-white">𝔻𝕒𝕚𝕝𝕪𔒝HUNT</h1>
          </div>

          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <User className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                <Menu className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-200 dark:border-gray-700">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{user.full_name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          onProfileClick();
                          setShowMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        My Orders
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setShowMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        onAuthClick();
                        setShowMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Sign In / Register
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
