import { useContext } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductPageContext from "../../../../context/product/ProductPageContext";

export default function ProductDetails() {
  const { product } = useContext(ProductPageContext);

  const Stock = () => {
    if (product.qty === 0)
      return (
        <span className="bg-danger text-white pt-1 pb-1 ps-2 pe-2 small rounded">
          En rupture de stock
        </span>
      );

    if (product.qty <= 5)
      return (
        <span className="text-danger">
          Il reste que quelques articles disponibles
        </span>
      );

    return <span className="text-success">En stock</span>;
  };

  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Row>
            <Col xs={4}>
              <span className="fw-medium">Référence</span>
            </Col>

            <Col xs={8}>
              <span className="small">{product.ref}</span>
            </Col>
          </Row>
        </ListGroup.Item>

        {product.category && (
          <ListGroup.Item>
            <Row>
              <Col xs={4}>
                <span className="fw-medium">Catégorie</span>
              </Col>

              <Col xs={8}>
                <Link to={`/shop/category/${product.category.id}`}>
                  {product.category.title}
                </Link>
              </Col>
            </Row>
          </ListGroup.Item>
        )}

        {product.brand && (
          <ListGroup.Item>
            <Row>
              <Col xs={4}>
                <span className="fw-medium">Marque</span>
              </Col>

              <Col xs={8}>
                <Link to={`/shop/brand/${product.brand.id}`}>
                  {product.brand.name}
                </Link>
              </Col>
            </Row>
          </ListGroup.Item>
        )}

        {product.brand?.country && (
          <ListGroup.Item>
            <Row>
              <Col xs={4}>
                <span className="fw-medium">Pays d'origine</span>
              </Col>

              <Col xs={8}>
                <Link to={`/shop/country/${product.brand.country}`}>
                  <img
                    src={`/img/flags/${product.brand.country.toUpperCase()}.png`}
                    className="img-fluid"
                    alt={product.brand.country}
                    style={{ height: 30 }}
                  />
                </Link>
              </Col>
            </Row>
          </ListGroup.Item>
        )}

        <ListGroup.Item>
          <Row>
            <Col xs={4}>
              <span className="fw-medium">Stock</span>
            </Col>

            <Col xs={8}>
              <Stock />
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}
