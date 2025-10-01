import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import { AuthModal } from './components/AuthModal';
import { CartSidebar } from './components/CartSidebar';
import { Checkout } from './components/Checkout';
import { UserProfile } from './components/UserProfile';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { products } from './data/mockData';
import { Product, Order } from './types';
import { Zap, TrendingUp } from 'lucide-react';

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = !selectedCategory || product.category_id === selectedCategory;
      const matchesSearch = !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const trendingProducts = useMemo(() => {
    return products.filter(p => p.is_trending).slice(0, 8);
  }, []);

  const offerProducts = useMemo(() => {
    return products.filter(p => p.is_on_offer).slice(0, 8);
  }, []);

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleOrderComplete = (order: Order) => {
    setLastOrder(order);
    setShowOrderSuccess(true);
    setTimeout(() => setShowOrderSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header
        onAuthClick={() => setShowAuthModal(true)}
        onCartClick={() => setShowCart(true)}
        onCategoryClick={setSelectedCategory}
        onProfileClick={() => setShowProfile(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <CategoryNav
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {showOrderSuccess && lastOrder && (
          <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2">
              Order Placed Successfully!
            </h3>
            <p className="text-green-700 dark:text-green-300">
              Order ID: {lastOrder.id}
            </p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
              You can track your order in "My Orders" section
            </p>
          </div>
        )}

        {!selectedCategory && !searchQuery && (
          <>
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-6 h-6 text-orange-500" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Trending Products
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => setSelectedProduct(product)}
                    onAuthRequired={() => setShowAuthModal(true)}
                  />
                ))}
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="w-6 h-6 text-red-500" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Special Offers
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {offerProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => setSelectedProduct(product)}
                    onAuthRequired={() => setShowAuthModal(true)}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            {selectedCategory ? 'Category Products' : searchQuery ? 'Search Results' : 'All Products'}
          </h2>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                  onAuthRequired={() => setShowAuthModal(true)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="mb-2">DailyHUNT - Daily Deals/Offers on Trending Products</p>
            <p className="text-sm">Fast Delivery • Secure Payments • 24/7 Support</p>
        
            <p className="text-sm">Designed & Built by DEVESH SHARMA</p>
          </div>
        </div>
      </footer>

      <ProductDetail
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAuthRequired={() => {
          setSelectedProduct(null);
          setShowAuthModal(true);
        }}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <CartSidebar
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        onCheckout={handleCheckout}
      />

      <Checkout
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        onOrderComplete={handleOrderComplete}
      />

      <UserProfile
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
