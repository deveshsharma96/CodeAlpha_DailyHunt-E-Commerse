import React from 'react';
import { ShoppingCart, Star, Zap } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onAuthRequired: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onAuthRequired }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      onAuthRequired();
      return;
    }
    addToCart(product);
  };

  const finalPrice = product.price * (1 - product.discount_percentage / 100);

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.discount_percentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
            -{product.discount_percentage}%
          </div>
        )}
        {product.is_trending && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
            <Zap className="w-3 h-3" />
            Trending
          </div>
        )}
        {product.fast_delivery_available && (
          <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-bold">
            10 Min Delivery
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {product.rating}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({product.reviews_count})
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ₹{finalPrice.toFixed(2)}
          </span>
          {product.discount_percentage > 0 && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              ₹{product.price.toFixed(2)}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};
