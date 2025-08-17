import { Col, Row } from "react-bootstrap";
import useSWR from "swr";
import { apiStorage } from "../../../config/api/api";
import { Link } from "react-router-dom";
import FullListLoader from "../../../common/loader/ListLoader";
import { Swiper, SwiperSlide } from "swiper/react";


export default function Brands() {
  const url = `/brands?itemsPerPage=12`;

  const { data: brands, error } = useSWR(url);

  if (error) return "Une erreur est survenue !";

  if (!brands) return <FullListLoader colNumber={5} />;

  return (
    <Row className="mb-4 mt-4">
      <Col md={12} className="mb-4">
        <div className="mt-4 mb-4 text-center">
          <h2 className="pink fw-bold">Nos marques</h2>

          <Link to="/shop/brands">Voir toutes les marques</Link>
        </div>
        <Swiper
         className="mt-3"
        loop
        spaceBetween={20}
        autoplay={true}
        breakpoints={{
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          640: {
            spaceBetween: 20,
            slidesPerView: 2.1,
            centeredSlides: true,
          },
          320: {
            spaceBetween: 20,
            slidesPerView: 2.2,
            centeredSlides: true,
          },
        }}
        >
       
       {brands["hydra:member"].map((brand) => (
               <SwiperSlide key={brand.id}>
                <Link to={`/shop/brand/${brand.id}`}>
                  <img
                    src={`${apiStorage}/${brand.image}`}
                    className="img-fluid border"
                    alt={brand.name}
                  />
                </Link>
              </SwiperSlide>
            ))}

        </Swiper>
      </Col>
    </Row>
  );
}
