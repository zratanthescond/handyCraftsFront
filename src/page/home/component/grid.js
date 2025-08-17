import { Carousel, Col, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { apiStorage } from "../../../config/api/api";
import styles from "./style/grid.module.scss";

export default function Grid() {
  const { data, error } = useSWR("/homes/1");

  if (!data)
    return (
      <ContentLoader viewBox="0 0 800 400" height={375} width={500}>
        <path d="M484.52,64.61H15.65C7.1,64.61.17,71.2.17,79.31V299.82c0,8.12,6.93,14.7,15.48,14.7H484.52c8.55,0,15.48-6.58,15.48-14.7V79.31C500,71.2,493.07,64.61,484.52,64.61Zm-9,204.34c0,11.84-7.14,21.44-15.94,21.44H436.39L359.16,171.52c-7.1-10.92-19.67-11.16-27-.51L258.64,277.94C253.78,285,245.73,286,240,280.2l-79.75-80.62c-6-6.06-14.33-5.7-20,.88L62.34,290.39H40.63c-8.8,0-15.94-9.6-15.94-21.44V110.19c0-11.84,7.14-21.44,15.94-21.44H459.54c8.8,0,15.94,9.6,15.94,21.44Z" />
        <ellipse cx="27.53" cy="26.15" rx="27.53" ry="26.15" />
        <rect x="69.36" y="0.5" width="87.36" height="16.48" rx="4.5" />
        <rect x="0.53" y="328.35" width="87.36" height="16.48" rx="4.5" />
        <rect x="95.84" y="328.35" width="87.36" height="16.48" rx="4.5" />
        <rect x="195.38" y="328.35" width="304.45" height="16.48" rx="4.5" />
        <rect x="412.47" y="358.52" width="87.36" height="16.48" rx="4.5" />
        <rect x="291.22" y="358.52" width="113.31" height="16.48" rx="4.5" />
        <rect x="0.53" y="358.52" width="282.21" height="16.48" rx="4.5" />
        <rect x="69.36" y="25.22" width="164.67" height="27.07" rx="3.83" />
      </ContentLoader>
    );

  if (error) return (null);

  return (
    <Row className="mb-3">
      <Col md={8} className="pe-md-0 mb-3 mb-md-0">
        <Carousel>
          {data.sliders.map((item) => (
            <Carousel.Item key={item.id}>
              <Link
                to={item.link ? item.link : "/"}
              >
                <img
                  src={`${apiStorage}/${item.image}`}
                  className={`img-fluid ${styles.imgCarousel}`}
                  alt=""
                />
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>

      <Col md={4} className="d-none d-md-block">
        {data.smallBanners.map((item) => (
          <Link
          key={item.id}
          to={item.link ? item.link : "/"}
        >
          <img
            src={`${apiStorage}/${item.image}`}
            className="img-fluid mb-3 w-100"
            alt=""
          />
           </Link>
        ))}
      </Col>
    </Row>
  );
}
