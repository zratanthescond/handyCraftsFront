import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  Col,
  Container,
  Pagination,
  Row,
  Alert,
} from "react-bootstrap";
import { useParams } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import useSWR from "swr";
import FullListLoader from "../../common/loader/ListLoader";
import ProductBlock from "../../common/productBlock";

export default function Country() {
  const { code } = useParams();

  const countryName = new Intl.DisplayNames([code], { type: "region" }).of(
    code
  );

  const [pageNumber, setPageNumber] = useState(1);

  const [lastPage, setLastPage] = useState(null);

  const handleNextPage = () => setPageNumber(pageNumber + 1);

  const handlePrevPage = () => setPageNumber(pageNumber - 1);

  const url = `/products?itemsPerPage=16&_page=${pageNumber}&brand.country=${code}`;

  const { data: products, error } = useSWR(url);

  const lastPageParam = new URLSearchParams(
    products && products["hydra:view"]
      ? products["hydra:view"]["hydra:last"]
      : "_page=1"
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

  if (!products) return <FullListLoader colNumber={4} />;

  if (error) return "Une erreur est survenue";

  return (
    <Container className="mt-4 mb-5">
      <Row>
        <Col md={12}>
          <Breadcrumb className="pt-4">
            <LinkContainer to="/">
              <Breadcrumb.Item>Paramall</Breadcrumb.Item>
            </LinkContainer>

            <LinkContainer to="/shop">
              <Breadcrumb.Item>Boutique</Breadcrumb.Item>
            </LinkContainer>
          </Breadcrumb>

          <h1 className="fs-3 fw-bold mb-4">
            Produits d'origine : {countryName}
          </h1>

          <Row>
            {products["hydra:member"].map((product) => (
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

        {products["hydra:member"].length === 0 && (
          <Alert>Aucun produit d'origine {countryName} disponible</Alert>
        )}
      </Row>
    </Container>
  );
}
