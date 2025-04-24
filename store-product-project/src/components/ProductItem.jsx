import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { currenyTRY } from "../utils/format";

export default function ProductItem({ product }) {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="500"
              image={`http://localhost:5001/images/${product.image}`}
              alt={product.title}
              sx={{ objectFit: "contain", backgroundColor: "#f5f5f5", p: 2 }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              {currenyTRY.format(product.price)}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Button variant="contained" color="primary" size="large">
              Sepete Ekle
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Box>
  );
}
