import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Col, Container, Pagination, Row, Spinner } from "react-bootstrap";
import useSWR from "swr";
import FullListLoader from "../../common/loader/ListLoader";
import ProductBlock from "../../common/productBlock";
import { Helmet } from "react-helmet-async";

export default function Shop() {
  const [pageNumber, setPageNumber] = useState(1);

  const [lastPage, setLastPage] = useState(null);

  const handleNextPage = () => setPageNumber(pageNumber + 1);

  const handlePrevPage = () => setPageNumber(pageNumber - 1);

  const url = `/products?itemsPerPage=16&_page=${pageNumber}`;

  const { data, error } = useSWR(url);

  const products = data ? data["hydra:member"] : [];

  const lastPageParam = new URLSearchParams(
    data ? data["hydra:view"]["hydra:last"] : 0
  );

  const lastPageInit = lastPageParam.get("_page");

  useEffect(() => {
    if (lastPageInit) {
      setLastPage(lastPageInit);
    }
  }, [lastPageInit]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNumber]);

  if (!data) return <FullListLoader colNumber={4} />;

  if (error) return "Une erreur est survenue";

  return (
    <>
      <Helmet>
        <title>Boutique - Paramall</title>
      </Helmet>

      <Container className="mt-5 mb-5">
        <Row>
          <Col md={12}>
            <h1 className="fw-bold fs-3 mb-3">Boutique</h1>

            <Row>
              {products.map((product) => (
                <Col md={3} className="mb-3" key={product.id}>
                  <ProductBlock product={product} />
                </Col>
              ))}
            </Row>
          </Col>

          {lastPage && (
            <Col md={12}>
              <Pagination className="justify-content-center mt-2 fw-medium">
                <Pagination.Prev
                  onClick={handlePrevPage}
                  disabled={pageNumber === 1}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />

                  <span className="ms-2">Précédent</span>
                </Pagination.Prev>

                <Pagination.Next
                  onClick={handleNextPage}
                  disabled={lastPage <= pageNumber}
                >
                  <span className="me-2">Suivant</span>

                  <FontAwesomeIcon icon={faChevronRight} />
                </Pagination.Next>
              </Pagination>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}
