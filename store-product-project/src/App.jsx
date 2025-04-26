import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import MainLayout from "./layouts/MainLayouts";
import Home from "./pages/Home";
import Cart from "./cart/Cart";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import { useEffect } from "react";
import requests from "./api/apiClient";
import { useDispatch } from "react-redux";
import { setCart } from "./cart/cartSlice";
import { useUser } from "./context/UserContext";

function AppContent() {
  const dispatch = useDispatch();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      requests.cart
        .get()
        .then((cart) => dispatch(setCart(cart)))
        .catch((error) => console.log(error));
    }
  }, [user, dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: user ? <Home /> : <Navigate to="/login" replace />,
        },
        {
          path: "home",
          element: user ? <Home /> : <Navigate to="/login" replace />,
        },
        {
          path: "cart",
          element: user ? <Cart /> : <Navigate to="/login" replace />,
        },
        {
          path: "login",
          element: !user ? <Login /> : <Navigate to="/" replace />,
        },
        {
          path: "product",
          children: [
            {
              index: true,
              element: user ? <Product /> : <Navigate to="/login" replace />,
            },
            {
              path: ":id",
              element: user ? (
                <ProductDetail />
              ) : (
                <Navigate to="/login" replace />
              ),
            },
          ],
        },
        {
          path: "register",
          element: !user ? <Register /> : <Navigate to="/" replace />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </UserProvider>
  );
}

export default App;
