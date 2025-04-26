import { createContext, useState, useContext } from "react";
import requests from "../api/apiClient";

export const CartContext = createContext();

export function useCartContext() {
  const context = useContext(CartContext);
  return context;
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  const addItem = async (productId, quantity = 1) => {
    try {
      const updatedCart = await requests.cart.addItem(productId, quantity);
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error("Sepete ürün eklenirken hata:", error);
      throw error;
    }
  };

  const removeItem = async (productId, quantity = 1) => {
    try {
      const updatedCart = await requests.cart.deleteItem(productId, quantity);
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error("Sepetten ürün kaldırılırken hata:", error);
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
