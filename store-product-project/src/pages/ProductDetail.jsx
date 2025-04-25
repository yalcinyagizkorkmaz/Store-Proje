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
} from "@mui/material";
import { useCartContext } from "../context/CartContext";
import { currenyTRY } from "../utils/formats";
import requests from "../api/apiClient";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function ProductDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const { setCart } = useCartContext();
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

  if (isLoading) return <div>Yükleniyor...</div>;
  if (!product) return <div>Ürün bulunamadı</div>;

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              height: "500px",
              backgroundColor: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
            }}
          >
            <img
              src={`http://localhost:5001/images/${product.image}`}
              alt={product.title}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              {currenyTRY.format(product.price)}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 4, mb: 4 }}>
              <IconButton size="large">
                <FavoriteBorderIcon fontSize="large" />
              </IconButton>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleAddToCart}
                disabled={loading}
                sx={{ minWidth: "200px" }}
              >
                {loading ? "Ekleniyor..." : "Sepete Ekle"}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ my: 3 }} />
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Ürün Açıklaması
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
          </Box>
          <Box sx={{ mt: 3, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Ürün Detayları
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Kategori: {product.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Stok Durumu: {product.stock > 0 ? "Stokta Var" : "Stokta Yok"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Ürün Kodu: {product.id}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
