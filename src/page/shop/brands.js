import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Badge,
  Button,
  Pagination,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import useSWR from "swr";
import FullListLoader from "../../common/loader/ListLoader";
import { apiStorage } from "../../config/api/api";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import LazyImage from "../../common/LazyImage";

export default function Brands() {
  const [pageNumber, setPageNumber] = useState(1);

  const [lastPage, setLastPage] = useState(null);

  const handleNextPage = () => setPageNumber(pageNumber + 1);

  const handlePrevPage = () => setPageNumber(pageNumber - 1);

  const itemsPerPage = 16;

  const [country, setCountry] = useState(null);

  const handleCountry = (country) => {
    setPageNumber(1);
    setCountry(country);
  };

  const [firstLetter, setFirstLetter] = useState(null);

  const handleFirstLetter = (fl) => {
    setFirstLetter(fl);
    setPageNumber(1);
  };

  const alphaUnicodes = Array.from(Array(26)).map((e, i) => i + 65);

  const alphabet = alphaUnicodes.map((x) => String.fromCharCode(x));

  const baseUrl = `/brands?order[name]=asc&itemsPerPage=${itemsPerPage}&_page=${pageNumber}&exists[image]=true`;

  const url =
    baseUrl +
    (country ? `&country=${country}` : "") +
    (firstLetter ? `&name=${firstLetter}` : "");

  const reset = () => {
    setCountry(null);
    setFirstLetter(null);
    setPageNumber(1);
  };

  const { data: brands, error } = useSWR(url);

  const countryName =
    country && new Intl.DisplayNames([country], { type: "region" }).of(country);

  const lastPageParam = new URLSearchParams(
    brands && brands["hydra:view"]
      ? brands["hydra:view"]["hydra:last"]
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
  }, [pageNumber, country]);

  if (!brands) return <FullListLoader colNumber={4} />;

  if (error) return <span>Une erreur est survenue</span>;

  return (
    <>
      <Helmet>
        <title>Toutes les marques - Paramall</title>
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

              <Breadcrumb.Item active>Toutes les marques</Breadcrumb.Item>
            </Breadcrumb>

            <h1 className="fs-3 fw-bold">
              {country
                ? `Les marques d'origine ${countryName}`
                : "Toutes les marques"}
            </h1>

            <ul className="list-inline d-flex flex-wrap">
              {alphabet.map((letter, i) => (
                <li key={i} className="me-1">
                  <Button
                    variant="link"
                    disabled={firstLetter == letter}
                    onClick={() => handleFirstLetter(letter)}
                  >
                    {letter}
                  </Button>
                </li>
              ))}
            </ul>
          </Col>

          {brands["hydra:member"].map((brand, index) => (
            <Col md={3} xs={6} className="mb-4" key={index}>
              <div className="d-flex flex-column">
                <div>
                  <Link to={`/shop/brand/${brand.id}`}>
                    <LazyImage
                      src={`${apiStorage}/${brand.image}`}
                      className="img-fluid border"
                      alt={brand.name}
                    />
                  </Link>
                </div>
                <div className="mt-1 d-flex flex-row justify-content-center align-items-center">
                  <div className="me-2">
                    {brand.country && (
                      <Button
                        variant="link"
                        className="p-0"
                        onClick={() => handleCountry(brand.country)}
                      >
                        <img
                          src={`/img/flags/${brand.country.toUpperCase()}.png`}
                          className="img-fluid"
                          alt={brand.country}
                          style={{ height: 20 }}
                        />
                      </Button>
                    )}
                  </div>
                  <Badge
                    bg={brand.productsNumber == 0 ? "light" : "light"}
                    className="text-dark"
                  >
                    {brand.productsNumber > 0 ? (
                      <span className="fw-medium">
                        {brand.productsNumber} produit
                        {brand.productsNumber > 1 && "s"}
                      </span>
                    ) : (
                      <span className="fw-medium">Aucun produit</span>
                    )}
                  </Badge>
                </div>
              </div>
            </Col>
          ))}

          {!brands["hydra:member"].length && (
            <span className="text-danger text-center">
              Aucun produit trouvé
            </span>
          )}

          {(country || firstLetter) && (
            <Col md={12} className="mt-5 d-flex justify-content-center">
              <Button onClick={reset}>
                <FontAwesomeIcon icon={faChevronLeft} />
                <span className="ms-2">Retour</span>
              </Button>
            </Col>
          )}

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
