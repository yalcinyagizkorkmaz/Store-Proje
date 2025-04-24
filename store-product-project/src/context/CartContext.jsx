import { createContext, useContext, useState, useEffect } from "react";
import requests from "../api/apiClient";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    // Sepeti yükle
    requests.cart
      .get()
      .then((cart) => {
        setCart(cart);
      })
      .catch((error) => {
        console.error("Sepet yüklenirken hata:", error);
      });
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
