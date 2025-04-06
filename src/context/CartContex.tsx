import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: any | React.Key | number | string) => void;
  getCartItemCount: () => number;
  getCartTotal: () => number;
  isCartOpen: boolean;
  toggleCart: () => void; 
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode | any; 
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false); 

  const addToCart = (productToAdd: Product) => {
    setCartItems((prevItems) => {
      //Revisa si el producto ya existe
      const existingItem = prevItems.find(item => item.product.id === productToAdd.id);

      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { product: productToAdd, quantity: 1 }];
      }
    });

    // if (!isCartOpen) setIsCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter(item => item.product.id !== productId)
    );
  };

  const getCartItemCount = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = (): number => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const toggleCart = () => {
      setIsCartOpen(prev => !prev);
  }

  const contextValue = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    getCartItemCount,
    getCartTotal,
    isCartOpen,
    toggleCart,
  }), [cartItems, isCartOpen]); 

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe usarse con CartProvider');
  }
  return context;
};