import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import useSWR from "swr";
import FullListLoader from "../../common/loader/ListLoader";
import Paginator from "../../common/Paginator";
import ProductBlock from "../../common/productBlock";

export default function ProductsByType() {
 
  const { slug } = useParams();

  const [pageNumber, setPageNumber] = useState(1);

  const url = `/products?type.slug=${slug}&itemsPerPage=12&_page=${pageNumber}`;

  const { data, error } = useSWR(url);

  const products = data ? data["hydra:member"] : [];

 
  if (!data) return <FullListLoader colNumber={4} />;

  if (error) return "Une erreur est survenue";

  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col md={12}>
          <h1 className="fw-bold fs-3 mb-3">{`${slug
            .charAt(0)
            .toUpperCase()}${slug.slice(1)}`}</h1>

          <Row>
            {products.map((product) => (
              <Col md={3} className="mb-3" key={product.id}>
                <ProductBlock product={product} />
              </Col>
            ))}
          </Row>
        </Col>

        <Col md={12}><Paginator data={data} pageNumber={pageNumber} setPageNumber={setPageNumber} /></Col>
      
      </Row>
    </Container>
  );
}
