import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import ProductBlock from "./productBlock";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Card } from "react-bootstrap";
import { apiStorage } from "../config/api/api";
import { Link } from "react-router-dom";
export default function ProductSlider({ products, children, ...rest }) {
  SwiperCore.use([Navigation]);

  const prevRef = useRef(null);

  const nextRef = useRef(null);

  const breakpoints = {
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    640: {
      spaceBetween: 20,
      slidesPerView: 1.2,
      centeredSlides: true,
    },
    320: {
      spaceBetween: 20,
      slidesPerView: 1.2,
      centeredSlides: true,
    },
  };

  return (
    <Swiper
      navigation={{
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      }}
      onBeforeInit={(swiper) => {
        swiper.params.navigation.prevEl = nextRef.current;
        swiper.params.navigation.nextEl = prevRef.current;
      }}
      spaceBetween={20}
      autoplay={true}
      breakpoints={breakpoints}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          {children !== undefined ? (
            <Link
              to={`/shop/product/${product.id}/${product.slug.toLowerCase()}`}
            >
              <Card>
                <img
                  src={`${apiStorage}/${product.thumbnail}`}
                  className="img-fluid d-block mx-auto"
                  alt={product.title}
                />
              </Card>
            </Link>
          ) : (
            <ProductBlock product={product} />
          )}
        </SwiperSlide>
      ))}

      <ul className="list-inline d-md-flex d-none justify-content-center mt-3">
        <li className="prev me-3">
          <Button ref={prevRef} variant="primary" size="sm">
            <FontAwesomeIcon icon={faChevronLeft} size="1x" />
          </Button>
        </li>

        <li className="next">
          <Button ref={nextRef} variant="primary" size="sm">
            <FontAwesomeIcon icon={faChevronRight} size="1x" />
          </Button>
        </li>
      </ul>
    </Swiper>
  );
}
