import { Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import useSWR from "swr";
import ProductBlock from "../../common/productBlock";

export default function SharedWishList() {
  const { userId } = useParams();

  const url = `/products?users=${userId}`;

  const { data: products, error } = useSWR(url);

  if (!products || error) return null;

  return (
    <>
      <Helmet>
        <title>Wishlist Partagé - Paramall</title>
      </Helmet>

      <Container className="mt-5 mb-5">
        <Row>
          <Col md={12}>
            <h1 className="fw-bold fs-3 mb-3">Wishlist</h1>

            <Row>
              {products["hydra:member"].map((product) => (
                <Col md={3} className="mb-3" key={product.id}>
                  <ProductBlock product={product} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
