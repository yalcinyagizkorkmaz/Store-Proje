import React, { useState, useEffect } from "react";
import {
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Alert,
  TableFooter,
} from "@mui/material";
import { currenyTRY } from "../utils/formats";
import { Delete } from "@mui/icons-material";
import { useCartContext } from "../context/CartContext";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { toast } from "react-toastify";
import requests from "../api/apiClient";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { removeItem, addItem } = useCartContext();

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await requests.cart.get();
      setCart(response);
      setError(null);
    } catch (error) {
      console.error("Sepet bilgileri alınırken hata oluştu:", error);
      setError("Sepet bilgileri alınamadı. Lütfen tekrar deneyin.");
      toast.error("Sepet bilgileri alınamadı");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemoveItem = async (productId, statusId, quantity = 1) => {
    try {
      const updatedCart = await removeItem(productId, quantity);
      if (updatedCart.cartItems.length === 0) {
        setCart(null);
      } else {
        setCart(updatedCart);
      }
      toast.success("Ürün sepetten kaldırıldı");
    } catch (error) {
      console.error("Ürün sepetten kaldırılırken hata oluştu:", error);
      toast.error("Ürün sepetten kaldırılamadı");
    }
  };

  const handleAddItem = async (productId) => {
    try {
      const updatedCart = await addItem(productId);
      setCart(updatedCart);
      toast.success("Ürün sepete eklendi");
    } catch (error) {
      console.error("Ürün sepete eklenirken hata oluştu:", error);
      toast.error("Ürün sepete eklenemedi");
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
    return (
      <Box p={3}>
        <Typography variant="h6">Sepetinizde ürün bulunmamaktadır</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 100 }}></TableCell>
            <TableCell sx={{ width: 100 }}>Ürün</TableCell>
            <TableCell sx={{ width: 100 }}>Fiyat</TableCell>
            <TableCell sx={{ width: 120 }}>Adet</TableCell>
            <TableCell sx={{ width: 120 }}>Toplam</TableCell>
            <TableCell sx={{ width: 50 }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.cartItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <img
                  src={`http://localhost:5001/images/${item.product.image}`}
                  alt={item.product.title}
                  style={{ width: "100%" }}
                />
              </TableCell>
              <TableCell>{item.product.title}</TableCell>
              <TableCell>
                {currenyTRY.format(parseInt(item.product.price))}
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    onClick={() =>
                      handleRemoveItem(
                        item.product.id,
                        "remove" + item.product.id
                      )
                    }
                    disabled={item.quantity <= 0}
                    size="small"
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <Typography variant="h6">{item.quantity}</Typography>
                  <IconButton
                    onClick={() => handleAddItem(item.product.id)}
                    size="small"
                  >
                    <AddCircleIcon />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell>
                {currenyTRY.format(
                  parseInt(item.product.price) * item.quantity
                )}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() =>
                    handleRemoveItem(
                      item.product.id,
                      "remove_all" + item.product.id,
                      item.quantity
                    )
                  }
                  color="error"
                >
                  <Delete />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} align="right">
              <Typography variant="h6">Toplam:</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">
                {currenyTRY.format(
                  cart.cartItems.reduce(
                    (total, item) =>
                      total + parseInt(item.product.price) * item.quantity,
                    0
                  )
                )}
              </Typography>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default Cart;
