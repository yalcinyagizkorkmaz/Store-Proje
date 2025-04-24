import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  CardActions,
  Button,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { currenyTRY } from "../utils/format";

export default function ProductCard({ product }) {
  return (
    <Card
      sx={{
        height: 400,
        width: 350,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <CardActionArea component={Link} to={`/product/${product.id}`}>
        <CardMedia
          component="img"
          height="200"
          image={`http://localhost:5001/images/${product.image}`}
          alt={product.title}
          sx={{
            objectFit: "contain",
            backgroundColor: "#f5f5f5",
            p: 2,
          }}
        />
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Typography variant="h6" noWrap gutterBottom>
            {product.title}
          </Typography>
          <Typography
            variant="h5"
            color="primary"
            sx={{ fontWeight: "bold", mt: 2 }}
          >
            {currenyTRY.format(product.price)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          backgroundColor: "white",
          borderTop: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <IconButton size="large">
            <FavoriteBorderIcon fontSize="large" />
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              minWidth: "120px",
              height: "40px",
            }}
          >
            Sepete Ekle
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
