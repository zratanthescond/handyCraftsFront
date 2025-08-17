import useSWR from "swr";
import * as dayjs from "dayjs";
import ProductSlider from "../../../common/slider";
import { Link } from "react-router-dom";
import FirstBanner from "./firstBanner";

export default function FlashSales() {


  const param = dayjs(new Date()).format("YYYY-MM-DD");

  const params = `discount.expireAt[after]:${param}&discount.beginAt[before]:${param}&itemsPerPage=8`;

  const url = `/products?${params}`;

  const { data, error } = useSWR(url);

  const products = data ? data["hydra:member"] : [];

  if (!data) return null;

  if (error) return null;

  if (data && products.length === 0) return null;

  return (
    <>
      <div className="mt-5 mb-4 text-center">
        <h2 className="pink fw-bold">Produits en promotion</h2>

        <Link to="/promo">Voir tous les produits</Link>
      </div>
        
        <ProductSlider products={products} />

        <div className="mt-4 mb-2"><FirstBanner /></div>
      
    </>
  );
}
