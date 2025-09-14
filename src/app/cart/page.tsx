"use client";

import { ShoppingCart, Trash2, Plus, Minus, Heart, ArrowLeft, Tag, Truck } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/cartContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, moveToWishlist } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const getSubtotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const getDiscount = () => (promoApplied ? getSubtotal() * 0.1 : 0);
  const getTax = () => (getSubtotal() - getDiscount()) * 0.08;
  const getTotal = () => getSubtotal() - getDiscount() + getTax();

  const getTotalSavings = () =>
    cartItems.reduce(
      (acc, item) =>
        acc + ((item.originalPrice ?? item.price) - item.price) * item.quantity,
      0
    );

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setPromoApplied(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              Continue Shopping
            </button>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-amber-600" />
            Shopping Cart ({cartItems.length})
          </h1>
        </div>

        {/* Savings Banner */}
        {getTotalSavings() > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-green-800">
              <Tag className="h-5 w-5" />
              <span className="font-semibold">
                You're saving ${getTotalSavings().toFixed(2)} on this order!
              </span>
            </div>
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet</p>
            <button className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white border rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md ${
                    !item.inStock ? "border-red-200 bg-red-50" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Product Image */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      {item.originalPrice && item.originalPrice > item.price && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                          -{Math.round(
                            ((item.originalPrice - item.price) / item.originalPrice) * 100
                          )}
                          %
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.category}</p>
                          {!item.inStock && (
                            <p className="text-red-600 text-sm font-medium mt-1">Out of Stock</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => moveToWishlist(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            title="Move to Wishlist"
                          >
                            <Heart className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            title="Remove Item"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="font-bold text-xl text-gray-900">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-gray-500 line-through">
                            ${item.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                            disabled={item.quantity <= 1 || !item.inStock}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                            disabled={!item.inStock}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-lg">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <p className="text-sm text-green-600">
                              Save $
                              {(
                                (item.originalPrice - item.price) *
                                item.quantity
                              ).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Promo Code Section */}
              <div className="bg-white border rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Promo Code</h3>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code (try SAVE10)"
                    className="flex-grow px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    disabled={promoApplied}
                  />
                  <button
                    onClick={applyPromoCode}
                    disabled={!promoCode || promoApplied}
                    className="px-6 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {promoApplied ? "Applied" : "Apply"}
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-green-600 text-sm mt-2">✓ Promo code applied successfully!</p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white border rounded-xl p-6 shadow-sm h-fit sticky top-8">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount (SAVE10)</span>
                    <span>-${getDiscount().toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${getTax().toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Shipping
                  </span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                {getTotalSavings() > 0 && (
                  <p className="text-sm text-green-600 mt-1">
                    Total savings: ${getTotalSavings().toFixed(2)}
                  </p>
                )}
              </div>

              <button
                className="w-full bg-amber-600 text-white py-4 rounded-lg font-semibold hover:bg-amber-700 transition-colors transform hover:scale-[1.02] active:scale-[0.98] mb-4"
                disabled={cartItems.some((item) => !item.inStock)}
              >
                {cartItems.some((item) => !item.inStock)
                  ? "Remove Out of Stock Items to Continue"
                  : "Proceed to Checkout"}
              </button>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                  <Truck className="h-4 w-4" />
                  Free shipping on orders over $100
                </p>
                <p className="text-xs text-gray-500">
                  Secure checkout with SSL encryption
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
