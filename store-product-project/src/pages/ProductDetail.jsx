import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import requests from "../api/apiClient";
export default function ProductDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProductDetail() {
      try {
        const data = await requests.products.detail(id);

        setProduct(data);
      } catch (error) {
        console.error("Product detail fetching error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProductDetail();
  }, [id]);

  if (isLoading) return <div>Yükleniyor...</div>;
  if (!product) return <div>Ürün bulunamadı</div>;

  return <ProductItem product={product} />;
}
