
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '@/types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, variant?: string) => void;
  removeItem: (productId: string, variant?: string) => void;
  updateQuantity: (productId: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity: number = 1, variant?: string) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(
        item => item.product.id === product.id && item.variant === variant
      );
      
      if (existingItemIndex > -1) {
        // Item already exists, update quantity
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Item doesn't exist, add new item
        return [...currentItems, { product, quantity, variant }];
      }
    });
  };

  const removeItem = (productId: string, variant?: string) => {
    setItems(currentItems => 
      currentItems.filter(
        item => !(item.product.id === productId && item.variant === variant)
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, variant?: string) => {
    if (quantity <= 0) {
      removeItem(productId, variant);
      return;
    }
    
    setItems(currentItems => {
      return currentItems.map(item => {
        if (item.product.id === productId && item.variant === variant) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
