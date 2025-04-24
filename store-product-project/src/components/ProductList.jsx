import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        p: 3,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {products.map((p) => (
        <Grid
          key={p.id}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ProductCard product={p} />
        </Grid>
      ))}
    </Grid>
  );
}
