import { Link } from "react-router-dom";
import useSWR from "swr";
import FullListLoader from "../../../common/loader/ListLoader";
import ProductSlider from "../../../common/slider";

export default function ProductsTabs() {

  const url = `/homes/1`;

  const { data, error } = useSWR(url);

  const products = data ? data["featuredProducts"] : [];

  if (!data) return <FullListLoader colNumber={4} />;

  if (error) return <h1>Something went wrong!</h1>;

  return (
    <>
      <div className="mt-5 mb-4 text-center">
        <h2 className="pink fw-bold">Produits en vedette</h2>

        <Link to="/shop">Voir tous les produits</Link>
      </div>

      <ProductSlider products={products} /> 
     
    </>
  );
}
