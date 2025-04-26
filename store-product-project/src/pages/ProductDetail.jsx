import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  IconButton,
  Paper,
  Divider,
  Alert,
} from "@mui/material";
import { useCartContext } from "../context/CartContext";
import { currenyTRY } from "../utils/formats";
import requests from "../api/apiClient";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InfoIcon from "@mui/icons-material/Info";

export default function ProductDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const { cart, setCart } = useCartContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProductDetail() {
      try {
        const data = await requests.products.details(id);
        setProduct(data);
      } catch (error) {
        console.error("Ürün detayı yüklenirken hata:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProductDetail();
  }, [id]);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const updatedCart = await requests.cart.addItem(product.id);
      setCart(updatedCart);
    } catch (error) {
      console.error("Sepete eklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCartItemQuantity = () => {
    if (!cart || !cart.cartItems) return 0;
    const cartItem = cart.cartItems.find(
      (item) => item.product.id === product?.id
    );
    return cartItem ? cartItem.quantity : 0;
  };

  if (isLoading) return <div>Yükleniyor...</div>;
  if (!product) return <div>Ürün bulunamadı</div>;

  const cartQuantity = getCartItemQuantity();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={`http://localhost:5001/images/${product.image}`}
            alt={product.title}
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              {currenyTRY.format(parseInt(product.price))}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            {cartQuantity > 0 && (
              <Alert icon={<InfoIcon />} severity="info" sx={{ mb: 2 }}>
                Bu üründen sepette {cartQuantity} adet bulunmaktadır.
              </Alert>
            )}
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                disabled={loading}
              >
                {loading ? "Ekleniyor..." : "Sepete Ekle"}
              </Button>
              <IconButton color="primary">
                <FavoriteBorderIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
