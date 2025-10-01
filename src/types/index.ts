export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  created_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  address_type: 'home' | 'work' | 'other';
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon: string;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  discount_percentage: number;
  stock_quantity: number;
  image_url: string;
  is_trending: boolean;
  is_on_offer: boolean;
  rating: number;
  reviews_count: number;
  fast_delivery_available: boolean;
  category?: Category;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  product?: Product;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  user_id: string;
  address_id: string;
  total_amount: number;
  status: OrderStatus;
  fast_delivery: boolean;
  fast_delivery_fee: number;
  payment_method: string;
  payment_status: string;
  created_at: string;
  updated_at: string;
  address?: Address;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: number;
  product?: Product;
}
