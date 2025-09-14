"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type CartItem = {
  category: ReactNode;
  id: string;
  name: string;
  price: number;
  originalPrice?: number; // to handle discounts
  image: string;
  quantity: number;
  inStock?: boolean;
};

type CartContextType = {
  cartItems: CartItem[];
  wishlist: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, qty: number) => void;
  moveToWishlist: (id: string) => void;
  applyPromoCode: (code: string) => boolean;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getDiscount: () => number;
  getTax: () => number;
  getTotal: () => number;
  getTotalSavings: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState<string | null>(null);

  //  Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  //  Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
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
    if (qty < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const moveToWishlist = (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      setWishlist((prev) => [...prev, item]);
      removeFromCart(id);
    }
  };

  const applyPromoCode = (code: string) => {
    if (code.toUpperCase() === "SAVE10") {
      setPromoCode("SAVE10");
      return true;
    }
    return false;
  };

  //  Helpers
  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const getSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const getDiscount = () =>
    promoCode === "SAVE10" ? getSubtotal() * 0.1 : 0;

  const getTax = () => (getSubtotal() - getDiscount()) * 0.08;

  const getTotal = () => getSubtotal() - getDiscount() + getTax();

  const getTotalSavings = () =>
    cartItems.reduce(
      (acc, item) =>
        acc + ((item.originalPrice ?? item.price) - item.price) * item.quantity,
      0
    );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlist,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        moveToWishlist,
        applyPromoCode,
        getTotalItems,
        getSubtotal,
        getDiscount,
        getTax,
        getTotal,
        getTotalSavings,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
