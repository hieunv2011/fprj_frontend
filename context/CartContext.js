import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(i => i._id === item._id);
      if (existingItem) {
        return prevItems.map(i =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const updateItemQuantity = (id, quantity) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        // Remove item if quantity is zero or less
        return prevItems.filter(item => item._id !== id);
      } else {
        // Update item quantity
        return prevItems.map(item =>
          item._id === id ? { ...item, quantity } : item
        );
      }
    });
  };

  // Hàm resetCart để xóa sạch giỏ hàng
  const resetCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, updateItemQuantity, resetCart }}>
      {children}
    </CartContext.Provider>
  );
};
