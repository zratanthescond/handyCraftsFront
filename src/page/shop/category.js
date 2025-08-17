import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  Alert,
  Breadcrumb,
  Col,
  Container,
  Pagination,
  Row,
  Button,
} from "react-bootstrap";
import { useParams } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import useSWR from "swr";
import FullListLoader from "../../common/loader/ListLoader";
import ProductBlock from "../../common/productBlock";
import { Helmet } from 'react-helmet-async';

export default function Category() {
  function getParamId(id){
  let arr=id.split("-");
  return arr[arr.length-1]
  }
  const { id} = useParams();
  const idParsed =getParamId(id)
  const [pageNumber, setPageNumber] = useState(1);

  const [lastPage, setLastPage] = useState(null);

  const handleNextPage = () => setPageNumber(pageNumber + 1);

  const handlePrevPage = () => setPageNumber(pageNumber - 1);

  const url = `/products?itemsPerPage=16&_page=${pageNumber}&category.id=${idParsed}`;

  const { data: products, error } = useSWR(url);

  const { data: category } = useSWR(`/product_categories/${idParsed}`);

  const lastPageParam = new URLSearchParams(
    products ? products["hydra:view"]["hydra:last"] : 0
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

  if (!products || !category) return <FullListLoader colNumber={4} />;

  if (error) return "Une erreur est survenue";

  return (
    <Container className="mt-4 mb-5">
      <Helmet>
                <title>{category.page_title!=null?category.page_title:category.title}</title>
                <meta name="description" content={ category.meta_description!=null ? category.meta_description:category.description}  />
            </Helmet>
      <Row>
        <Col md={12}>
          <Breadcrumb className="pt-4">
            <LinkContainer to="/">
              <Breadcrumb.Item>Paramall</Breadcrumb.Item>
            </LinkContainer>

            <LinkContainer to="/shop">
              <Breadcrumb.Item>Boutique</Breadcrumb.Item>
            </LinkContainer>

            {category && (
              <Breadcrumb.Item active>{category.title}</Breadcrumb.Item>
            )}
          </Breadcrumb>

          {category && <h1 className="fs-3 fw-bold mb-4">{category.title}</h1>}

          <Row>
            {products["hydra:member"].length === 0 && (
              <Col md={6}>
                
                <Alert>Aucun produit dans cette catégorie</Alert>

                <LinkContainer to="/shop">
                  <Button>Voir tous les produits</Button>
                </LinkContainer>
              </Col>
            )}

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
      </Row>
    </Container>
  );
}
