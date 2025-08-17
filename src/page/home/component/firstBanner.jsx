import { Row, Col } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

export default function FirstBanner({ ...rest }) {
  return (
    <Row>
      <Col md={12}>
        <Link to="/promo">
          <LazyLoadImage
            src="/img/banner-home.png"
            className="img-fluid rounded"
            alt=""
          />
        </Link>
      </Col>
    </Row>
  );
}
