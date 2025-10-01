import React, { useState, useEffect } from 'react';
import { X, Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Order, OrderStatus } from '../types';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const statusIcons: Record<OrderStatus, React.ReactNode> = {
  pending: <Clock className="w-5 h-5 text-yellow-500" />,
  processing: <Package className="w-5 h-5 text-blue-500" />,
  shipped: <Truck className="w-5 h-5 text-blue-600" />,
  delivered: <CheckCircle className="w-5 h-5 text-green-500" />,
  cancelled: <XCircle className="w-5 h-5 text-red-500" />
};

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  shipped: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
};

export const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user) {
      const savedOrders = localStorage.getItem(`orders_${user.id}`);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    }
  }, [user, isOpen]);

  const handleCancelOrder = (orderId: string) => {
    if (!user) return;

    const updatedOrders = orders.map(order =>
      order.id === orderId && order.status === 'pending'
        ? { ...order, status: 'cancelled' as OrderStatus }
        : order
    );

    setOrders(updatedOrders);
    localStorage.setItem(`orders_${user.id}`, JSON.stringify(updatedOrders));
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full my-8 relative max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Orders</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Order ID: {order.id}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Placed on: {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {statusIcons[order.status]}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    {order.items?.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        {item.product && (
                          <>
                            <img
                              src={item.product.image_url}
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 dark:text-white">
                                {item.product.name}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Quantity: {item.quantity} × ₹{item.price_at_purchase.toFixed(2)}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Payment: {order.payment_method === 'card' ? 'Card' : 'Cash on Delivery'}
                      </p>
                      {order.fast_delivery && (
                        <p className="text-sm text-green-600 dark:text-green-400">
                          10 Min Fast Delivery (+₹{order.fast_delivery_fee.toFixed(2)})
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ₹{order.total_amount.toFixed(2)}
                      </p>
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="mt-2 text-sm text-red-600 dark:text-red-400 hover:underline"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>

                  {order.status === 'shipped' && (
                    <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        Your order is on the way! Expected delivery in 2-3 days.
                      </p>
                    </div>
                  )}

                  {order.status === 'delivered' && (
                    <div className="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                      <p className="text-sm text-green-700 dark:text-green-400">
                        Order delivered successfully!
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
