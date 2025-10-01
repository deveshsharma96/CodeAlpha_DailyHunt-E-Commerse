import React, { useState } from 'react';
import { X, Zap } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Order, OrderItem } from '../types';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderComplete: (order: Order) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ isOpen, onClose, onOrderComplete }) => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [fastDelivery, setFastDelivery] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'USA'
  });

  if (!isOpen) return null;

  const subtotal = getCartTotal();
  const fastDeliveryFee = 5.99;
  const hasFastDeliveryItems = cart.some(item => item.product?.fast_delivery_available);
  const total = subtotal + (fastDelivery ? fastDeliveryFee : 0);

  const handlePlaceOrder = () => {
    if (!user) return;

    const orderItems: OrderItem[] = cart.map(item => ({
      id: `order_item_${Date.now()}_${Math.random()}`,
      order_id: '',
      product_id: item.product_id,
      quantity: item.quantity,
      price_at_purchase: item.product!.price * (1 - item.product!.discount_percentage / 100),
      product: item.product
    }));

    const order: Order = {
      id: `order_${Date.now()}`,
      user_id: user.id,
      address_id: 'addr_1',
      total_amount: total,
      status: 'pending',
      fast_delivery: fastDelivery,
      fast_delivery_fee: fastDelivery ? fastDeliveryFee : 0,
      payment_method: paymentMethod,
      payment_status: paymentMethod === 'cod' ? 'pending' : 'paid',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      items: orderItems
    };

    orderItems.forEach(item => {
      item.order_id = order.id;
    });

    const existingOrders = JSON.parse(localStorage.getItem(`orders_${user.id}`) || '[]');
    localStorage.setItem(`orders_${user.id}`, JSON.stringify([order, ...existingOrders]));

    clearCart();
    onOrderComplete(order);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full my-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Checkout</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                Delivery Address
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Street Address"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={address.postalCode}
                  onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>

            {hasFastDeliveryItems && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={fastDelivery}
                    onChange={(e) => setFastDelivery(e.target.checked)}
                    className="w-5 h-5 text-blue-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold">
                      <Zap className="w-5 h-5" />
                      10 Minute Delivery
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Extra ₹{fastDeliveryFee.toFixed(2)} charge
                    </p>
                  </div>
                </label>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                Payment Method
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'card')}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-900 dark:text-white">Credit/Debit Card</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'cod')}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-900 dark:text-white">Cash on Delivery</span>
                </label>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {fastDelivery && (
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Fast Delivery Fee:</span>
                    <span>₹{fastDeliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                  <span>Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={!address.street || !address.city || !address.state || !address.postalCode}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
