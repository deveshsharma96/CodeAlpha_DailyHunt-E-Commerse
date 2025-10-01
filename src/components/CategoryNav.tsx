import React from 'react';
import { Laptop, Shirt, Dumbbell, Home, UtensilsCrossed } from 'lucide-react';
import { categories } from '../data/mockData';

interface CategoryNavProps {
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Laptop,
  Shirt,
  Dumbbell,
  Home,
  UtensilsCrossed
};

export const CategoryNav: React.FC<CategoryNavProps> = ({ selectedCategory, onCategorySelect }) => {
  return (
    <nav className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => onCategorySelect(null)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedCategory === null
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            All Products
          </button>
          {categories.map((category) => {
            const Icon = iconMap[category.icon];
            return (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
