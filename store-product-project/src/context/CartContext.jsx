import { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export function useCartContext() {
  const context = useContext(CartContext);
  return context;
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
