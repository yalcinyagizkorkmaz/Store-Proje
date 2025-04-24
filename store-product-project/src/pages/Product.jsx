import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import requests from "../api/apiClient";
export default function Product() {
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await requests.products.list();

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
