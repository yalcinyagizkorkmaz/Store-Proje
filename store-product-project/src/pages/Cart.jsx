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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useState, useEffect } from "react";
import requests from "../api/apiClient";

export default function CartPage() {
  const [cart, setCart] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    requests.cart
      .get()
      .then((cart) => {
        setCart(cart);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Typography variant="h6">Sepet yükleniyor...</Typography>;
  }

  if (!cart) {
    return <Typography variant="h6">Sepetinizde ürün bulunamadı</Typography>;
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
                  style={{ width: "100%" }}
                />
              </TableCell>
              <TableCell>{item.product.title}</TableCell>
              <TableCell>
                {currenyTRY.format(parseInt(item.product.price))}
              </TableCell>
              <TableCell>{item.product.quantity}</TableCell>
              <TableCell>
                {currenyTRY.format(item.product.price * item.product.quantity)}
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
                  {status.loading &&
                  status.id === "remove_all" + item.product.id ? (
                    <CircularProgress size="20px" />
                  ) : (
                    <Delete />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
