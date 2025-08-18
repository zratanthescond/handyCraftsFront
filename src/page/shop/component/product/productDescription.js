import { useContext, useState, useEffect } from "react";
import ProductPageContext from "../../../../context/product/ProductPageContext";
import { Button } from "react-bootstrap";
import ProductSlider from "../../../../common/slider";

export default function ProductDescription() {
  const { product } = useContext(ProductPageContext);

  const [description, setDescription] = useState(product.description);

  const [reduced, setReduced] = useState(false);

  const maxLength = 250;

  const increaseStr = () => {
    setDescription(product.description);

    setReduced(false);
  };

  const reduceStr = () => {
    setDescription(product.description?.substring(0, maxLength));

    setReduced(true);
  };

  const handleClick = () => {
    if (description.length > maxLength) {
      reduceStr();
    } else {
      increaseStr();
    }
  };

  useEffect(() => {
    reduceStr();
  }, []);

  if (!description) return null;

  return (
    <div>
      <p className="fs-md-16 fs-14 mb-0">
        {description.replace(/<[^>]*>/g, "")}
        {reduced && <span>....</span>}
      </p>
      <Button
        variant="link"
        className="p-0 shadow-none fs-md-16 fs-14"
        onClick={handleClick}
      >
        {description.length > maxLength ? "Lire moins" : "Lire plus"}
      </Button>

      {product.relatedProducts && (
        <>
          <br></br>
          <span className="fw-medium mb-2 mt-1">
            Disponible en {Object.values(product.relatedProducts).length}{" "}
            teintes :
          </span>
          <ProductSlider products={Object.values(product.relatedProducts)}>
            <div>lllll</div>
          </ProductSlider>
        </>
      )}
    </div>
  );
}
