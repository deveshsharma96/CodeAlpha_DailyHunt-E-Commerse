import React, { useState } from 'react';
import { X, ShoppingCart, Star, Minus, Plus, Zap } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
  onAuthRequired: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onAuthRequired }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();

  if (!product) return null;

  const finalPrice = product.price * (1 - product.discount_percentage / 100);

  const handleAddToCart = () => {
    if (!user) {
      onAuthRequired();
      return;
    }
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full my-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-white dark:bg-gray-700 rounded-full p-2"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div className="relative">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            {product.discount_percentage > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-2 rounded-md text-lg font-bold">
                -{product.discount_percentage}%
              </div>
            )}
            {product.is_trending && (
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-2 rounded-md text-sm font-bold flex items-center gap-1">
                <Zap className="w-4 h-4" />
                Trending
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  {product.rating}
                </span>
              </div>
              <span className="text-gray-500 dark:text-gray-400">
                ({product.reviews_count} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                ₹{finalPrice.toFixed(2)}
              </span>
              {product.discount_percentage > 0 && (
                <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                  ₹{product.price.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {product.description}
            </p>

            {product.fast_delivery_available && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <Zap className="w-5 h-5" />
                  <span className="font-semibold">10 Minute Delivery Available</span>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  Extra charges may apply
                </p>
              </div>
            )}

            <div className="mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.stock_quantity > 20
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : product.stock_quantity > 0
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {product.stock_quantity > 20
                  ? 'In Stock'
                  : product.stock_quantity > 0
                  ? `Only ${product.stock_quantity} left`
                  : 'Out of Stock'}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Quantity:</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Minus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                </button>
                <span className="text-xl font-semibold text-gray-900 dark:text-white w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  disabled={quantity >= product.stock_quantity}
                >
                  <Plus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock_quantity === 0}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
