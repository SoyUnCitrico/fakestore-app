import React, { createContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { CartContextType, CartItem, Product } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode | undefined | null; 
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
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

  const getCartItemCount = useCallback((): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const getCartTotal = useCallback((): number => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cartItems]);

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
  }), [cartItems, isCartOpen, getCartItemCount, getCartTotal]); 

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};


export  {
  CartContext,
  CartProvider
}