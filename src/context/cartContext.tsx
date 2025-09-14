"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  category: string; // Fixed: Changed from ReactNode to string
  inStock?: boolean;
  // Optional: Add product variants
  variant?: {
    size?: string;
    color?: string;
    [key: string]: any;
  };
};

type PromoCode = {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
};

type CartContextType = {
  cartItems: CartItem[];
  wishlist: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, qty: number) => void;
  moveToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void; // Added
  moveToCart: (id: string) => void; // Added
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void; // Added
  currentPromoCode: string | null; // Added
  getTotalItems: () => number;
  getSubtotal: () => number;
  getDiscount: () => number;
  getTax: () => number;
  getTotal: () => number;
  getTotalSavings: () => number;
  isLoading: boolean; // Added loading state
};

// Configuration
const TAX_RATE = 0.08;
const PROMO_CODES: PromoCode[] = [
  { code: "SAVE10", discount: 0.1, type: 'percentage' },
  { code: "SAVE20", discount: 0.2, type: 'percentage' },
  { code: "FLAT5", discount: 5, type: 'fixed' },
];

// Helper functions for localStorage
const getStorageItem = (key: string) => {
  try {
    if (typeof window === 'undefined') return null;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.warn(`Failed to read from localStorage key "${key}":`, error);
    return null;
  }
};

const setStorageItem = (key: string, value: any) => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Failed to write to localStorage key "${key}":`, error);
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = getStorageItem("cart") || [];
    const savedWishlist = getStorageItem("wishlist") || [];
    const savedPromoCode = getStorageItem("promoCode");
    
    setCartItems(savedCart);
    setWishlist(savedWishlist);
    setPromoCode(savedPromoCode);
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (!isLoading) {
      setStorageItem("cart", cartItems);
    }
  }, [cartItems, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setStorageItem("wishlist", wishlist);
    }
  }, [wishlist, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setStorageItem("promoCode", promoCode);
    }
  }, [promoCode, isLoading]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((cartItem) => 
        cartItem.id === item.id && 
        JSON.stringify(cartItem.variant) === JSON.stringify(item.variant)
      );
      
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id && 
          JSON.stringify(cartItem.variant) === JSON.stringify(item.variant)
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const moveToWishlist = (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      setWishlist((prev) => {
        // Check if item already exists in wishlist
        const exists = prev.some((wishItem) => wishItem.id === id);
        if (exists) return prev;
        return [...prev, { ...item, quantity: 1 }]; // Reset quantity to 1 for wishlist
      });
      removeFromCart(id);
    }
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const moveToCart = (id: string) => {
    const item = wishlist.find((i) => i.id === id);
    if (item) {
      addToCart({ ...item, quantity: 1 });
      removeFromWishlist(id);
    }
  };

  const applyPromoCode = (code: string): boolean => {
    const validPromo = PROMO_CODES.find(
      (promo) => promo.code.toUpperCase() === code.toUpperCase()
    );
    
    if (validPromo) {
      setPromoCode(validPromo.code.toUpperCase());
      return true;
    }
    return false;
  };

  const removePromoCode = () => {
    setPromoCode(null);
  };

  // Helper functions
  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const getSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const getDiscount = () => {
    if (!promoCode) return 0;
    
    const promo = PROMO_CODES.find((p) => p.code === promoCode);
    if (!promo) return 0;
    
    const subtotal = getSubtotal();
    return promo.type === 'percentage' 
      ? subtotal * promo.discount 
      : Math.min(promo.discount, subtotal);
  };

  const getTax = () => (getSubtotal() - getDiscount()) * TAX_RATE;

  const getTotal = () => getSubtotal() - getDiscount() + getTax();

  const getTotalSavings = () =>
    cartItems.reduce(
      (acc, item) =>
        acc + ((item.originalPrice ?? item.price) - item.price) * item.quantity,
      0
    ) + getDiscount();

  const value: CartContextType = {
    cartItems,
    wishlist,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    moveToWishlist,
    removeFromWishlist,
    moveToCart,
    applyPromoCode,
    removePromoCode,
    currentPromoCode: promoCode,
    getTotalItems,
    getSubtotal,
    getDiscount,
    getTax,
    getTotal,
    getTotalSavings,
    isLoading,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

// Optional: Export types for use in other components
export type { CartItem, CartContextType };