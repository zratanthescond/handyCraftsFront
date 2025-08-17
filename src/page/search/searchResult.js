import { useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import FullListLoader from "../../common/loader/ListLoader";
import Paginator from "../../common/Paginator";
import ProductBlock from "../../common/productBlock";

export default function SearchResult() {
  const { q } = useParams();

  const [pageNumber, setPageNumber] = useState(1);

  const { data, error } = useSWR(
    `products?title=${q}&itemsPerPage=12&_page=${pageNumber}`
  );

  if (!data) return <FullListLoader colNumber={4} />;

  if (error) return null;

  return (
    <>
      <Container className="mt-5 mb-5">
        <Row>
          <Col md={6}>
            <h1 className="fs-md-25 fs-23 mb-1">
              <span className="fw-normal me-1">Résultat de la recherche: </span>
              <span className="text-primary fw-bold">{q}</span>
            </h1>

            <Alert variant="info" className="mt-2">
              {data["hydra:totalItems"]} produit(s) trouvé(s)
            </Alert>
          </Col>

          <Col md={12}>
            <Row>
              {data["hydra:member"].map((product) => (
                <Col md={3} className="mb-3" key={product.id}>
                  <ProductBlock product={product} />
                </Col>
              ))}
            </Row>

            <Paginator
              data={data}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
