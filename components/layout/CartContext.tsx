"use client";

import { createContext, useContext, useState } from "react";
import { CartItemType } from "@/types/cart";

interface CartContextType {
  cart: CartItemType[];
  open: boolean;
  toggleCart: () => void;
  removeItem: (id: number) => void;
  addItem: (item: Omit<CartItemType, "quantity">, quantity?: number) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Start with an empty cart
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [open, setOpen] = useState(false);

  function toggleCart() {
    setOpen(!open);
  }

  function removeItem(id: number) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function addItem(item: Omit<CartItemType, "quantity">, quantity: number = 1) {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity }];
      }
    });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        open,
        toggleCart,
        removeItem,
        addItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("Cart error: useCart must be used within CartProvider");
  return context;
}