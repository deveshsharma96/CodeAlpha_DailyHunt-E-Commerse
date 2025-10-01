import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, onCheckout }) => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (!isOpen) return null;

  const total = getCartTotal();

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <ShoppingBag className="w-20 h-20 text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Your cart is empty
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              {cart.map((item) => {
                if (!item.product) return null;
                const finalPrice = item.product.price * (1 - item.product.discount_percentage / 100);

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700"
                  >
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">
                        {item.product.name}
                      </h3>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        ₹{finalPrice.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          className="p-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Minus className="w-3 h-3 text-gray-700 dark:text-gray-300" />
                        </button>
                        <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          className="p-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Plus className="w-3 h-3 text-gray-700 dark:text-gray-300" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product_id)}
                          className="ml-auto p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₹{total.toFixed(2)}
                </span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
