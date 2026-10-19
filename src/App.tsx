/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PromoBanner } from './components/PromoBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FlyerPriceTable } from './components/FlyerPriceTable';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PairingSection } from './components/PairingSection';
import { RecipesSection } from './components/RecipesSection';
import { WhyPeniel } from './components/WhyPeniel';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { NotificationModal } from './components/NotificationModal';
import { Footer } from './components/Footer';

import { PRODUCTS } from './data/products';
import { CartItem, Product, Order } from './types';
import {
  getStoredOrders,
  saveNewOrder,
  getStoredFavorites,
  saveStoredFavorites,
} from './utils/storage';

export default function App() {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('peniel_cart_items_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Coupons
  const [couponCode, setCouponCode] = useState<string>('PRIMEIRACOMPRA');

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => getStoredFavorites());

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => getStoredOrders());

  // Modal / Drawer visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('peniel_cart_items_v1', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Cart calculations
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  // Add to cart handler
  const handleAddToCart = (
    product: Product,
    selectedWeight: string,
    unitPrice: number,
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.product.id === product.id && i.selectedWeight === selectedWeight
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      }
      return [...prev, { product, selectedWeight, unitPrice, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, selectedWeight: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(productId, selectedWeight);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedWeight === selectedWeight
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string, selectedWeight: string) => {
    setCartItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.selectedWeight === selectedWeight))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Favorites toggle
  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      saveStoredFavorites(updated);
      return updated;
    });
  };

  // Re-order from history
  const handleRepeatOrder = (items: CartItem[]) => {
    setCartItems(items);
    setIsCartOpen(true);
  };

  // Save new order on checkout completion
  const handleOrderCompleted = (newOrder: Order) => {
    saveNewOrder(newOrder);
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const salgadaCarroChefe = PRODUCTS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1F2722] selection:bg-[#E8C438] selection:text-[#18392B]">
      {/* Top Promotional Bar */}
      <PromoBanner
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onApplyCoupon={(code) => {
          setCouponCode(code);
          setIsCartOpen(true);
        }}
      />

      {/* Top Bar Navigation */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        favoritesCount={favorites.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenOrderHistory={() => setIsOrderHistoryOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onScrollTo={handleScrollTo}
        unreadNotifications={true}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreCatalog={() => handleScrollTo('catalogo')}
          onExplorePairings={() => handleScrollTo('harmonizacoes')}
        />

        {/* Digital Replica & Interactive Tabela de Valores from Flyer */}
        <FlyerPriceTable
          salgadaProduct={salgadaCarroChefe}
          onAddToCart={handleAddToCart}
          onOpenProductDetail={(prod) => setDetailProduct(prod)}
        />

        {/* Full Intelligent Catalog with Taste Profile Filters */}
        <ProductCatalog
          products={PRODUCTS}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onAddToCart={handleAddToCart}
          onOpenDetail={(prod) => setDetailProduct(prod)}
        />

        {/* Drink & Wine Pairings with Real Customer Testimonials */}
        <PairingSection onAddToCart={handleAddToCart} />

        {/* Quick Culinary Recipes using Peniel Chips */}
        <RecipesSection onAddToCart={handleAddToCart} />

        {/* Brand Mission, Banana Sourcing, Quality & WhatsApp Contacts */}
        <WhyPeniel />
      </main>

      {/* Footer */}
      <Footer onScrollTo={handleScrollTo} />

      {/* Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        couponCode={couponCode}
        onApplyCoupon={(code) => setCouponCode(code)}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        couponCode={couponCode}
        onOrderCompleted={handleOrderCompleted}
        onClearCart={handleClearCart}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
        onOpenDetail={(prod) => setDetailProduct(prod)}
      />

      <OrderHistoryModal
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
        orders={orders}
        onRepeatOrder={handleRepeatOrder}
      />

      <NotificationModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onApplyCoupon={(code) => {
          setCouponCode(code);
          setIsCartOpen(true);
        }}
        onScrollTo={handleScrollTo}
      />

      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onAddToCart={handleAddToCart}
        isFavorite={detailProduct ? favorites.includes(detailProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}
