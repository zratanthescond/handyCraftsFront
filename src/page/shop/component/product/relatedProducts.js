import { useContext } from "react";
import useSWR from "swr";
import ProductSlider from "../../../../common/slider";
import ProductPageContext from "../../../../context/product/ProductPageContext";

export default function RelatedProducts() {
  
  const { product: currentProduct } = useContext(ProductPageContext);
  
  const url = `products?itemsPerPage=12&_page=1&category.id=${currentProduct.category.id}`;

  const { data, error } = useSWR(url);

  const products = data ? data["hydra:member"] : [];

  const relatedProducts = products.filter((p) => p.id !== currentProduct.id);

  if (!data || relatedProducts.length === 0 || error ) return (null);

  return (
      <>
      
      <h3 className="fw-bold fs-4 mb-3 mt-3">On vous recommande aussi</h3>
      
      <ProductSlider products={relatedProducts} />
       
      </>
  );
}
