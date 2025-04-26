import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import MainLayout from "./layouts/MainLayouts";
import Home from "./pages/Home";
import Cart from "./cart/Cart";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import { useCartContext } from "./context/CartContext";
import { useEffect } from "react";
import requests from "./api/apiClient";
import { useDispatch } from "react-redux";
import { setCart } from "./cart/cartSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CartProvider>
        <MainLayout />
      </CartProvider>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "product",
        children: [
          {
            index: true,
            element: <Product />,
          },
          {
            path: ":id",
            element: <ProductDetail />,
          },
        ],
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    requests.cart
      .get()
      .then((cart) => dispatch(setCart(cart)))
      .catch((error) => console.log(error));
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
