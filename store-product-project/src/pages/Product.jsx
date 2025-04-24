import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";

export default function Product() {
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:5001/products");
        const data = await response.json();
        setLoadedProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  return <ProductList products={loadedProducts} />;
}
