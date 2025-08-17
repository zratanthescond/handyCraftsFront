import { Breadcrumb, Col, Container, Row, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import useSWR from "swr";
import FullListLoader from "../../common/loader/ListLoader";
import ProductBlock from "../../common/productBlock";
import { Helmet } from "react-helmet-async";

export default function Brand() {
  const { id } = useParams();

  const url = `/brands/${id}`;

  const { data: brand, error } = useSWR(url);

  if (!brand) return <FullListLoader colNumber={4} />;

  if (error) return <span>Une erreur est survenue</span>;

  return (
    <>
      <Helmet>
        <title>{brand.name} - Paramall</title>
      </Helmet>

      <Container className="mt-3 mb-5">
        <Row>
          <Col md={12} className="mb-3">
            <Breadcrumb className="pt-4">
              <LinkContainer to="/">
                <Breadcrumb.Item>Paramall</Breadcrumb.Item>
              </LinkContainer>

              <LinkContainer to={`/shop`}>
                <Breadcrumb.Item>Boutique</Breadcrumb.Item>
              </LinkContainer>

              <LinkContainer to={`/shop/brands`}>
                <Breadcrumb.Item>Marques</Breadcrumb.Item>
              </LinkContainer>

              <Breadcrumb.Item active>{brand.name}</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="fs-3 fw-bold">Produits de la marque {brand.name}</h1>
          </Col>

          {brand.productsNumber > 0 ? (
            brand.products.map((product) => (
              <Col md={3} className="mb-3" key={product.id}>
                <ProductBlock product={product} />
              </Col>
            ))
          ) : (
            <div className="d-flex flex-column">
              <div className="text-danger fw-medium">
                Aucun produit de marque {brand.name} disponible !
              </div>
              <div className="d-flex flex-md-row flex-column mt-3">
                <div className="me-md-3 mb-3">
                  <LinkContainer exact to="/shop">
                    <Button size="sm" variant="outline-primary">
                      Voir tous les produits
                    </Button>
                  </LinkContainer>
                </div>
                <div>
                  <LinkContainer to="/shop/brands">
                    <Button size="sm">Voir toutes les marques</Button>
                  </LinkContainer>
                </div>
              </div>
            </div>
          )}
        </Row>
      </Container>
    </>
  );
}
