import {
  Col,
  Container,
  Row,
  Breadcrumb,
  Alert,
  Button,
} from "react-bootstrap";
import useSWR from "swr";
import ProductBlock from "../../common/productBlock";
import { LinkContainer } from "react-router-bootstrap";
import FullListLoader from "../../common/loader/ListLoader";
import { Helmet } from "react-helmet-async";
import Paginator from "../../common/Paginator";
import { useState } from "react";

export default function Promo() {
  const [pageNumber, setPageNumber] = useState(1);

  const params = `itemsPerPage=12&discount=1&_page=${pageNumber}`;

  const url = `/products?${params}`;

  const { data: products, error } = useSWR(url);

  if (!products) return <FullListLoader colNumber={4} />;

  if (error) return <span>Une erreur est survenue !</span>;

  return (
    <>
      <Helmet>
        <title>Produits en promotion - Paramall</title>
      </Helmet>

      <Container className="mt-4 mb-5">
        <Row>
          <Col md={12} className="mb-3">
            <Breadcrumb className="pt-4">
              <LinkContainer to="/">
                <Breadcrumb.Item>Paramall</Breadcrumb.Item>
              </LinkContainer>

              <Breadcrumb.Item active>Promotions</Breadcrumb.Item>
            </Breadcrumb>

            <h1 className="fw-bold fs-3">Promotions</h1>
          </Col>

          {products["hydra:totalItems"] > 0 ? (
            <>
              {products["hydra:member"].map((product) => (
                <Col md={3} key={product.id} className="mb-3">
                  <ProductBlock product={product} />
                </Col>
              ))}

              <Paginator
                data={products}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
              />
            </>
          ) : (
            <Col md={6}>
              <Alert variant="info">
                Aucun produit en promotion actuellement
              </Alert>

              <LinkContainer to="shop">
                <Button>Voir tous les produits</Button>
              </LinkContainer>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}
