import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  Form,
  InputGroup,
  Button,
  Offcanvas,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { commonHttp } from "../../util/http";
import styles from "../../common/style/search.module.scss";
import { apiStorage } from "../../config/api/api";
import { LinkContainer } from "react-router-bootstrap";
import { priceFormater } from "../../util/priceHelper";

export default function MobileSearch({ showSearch, closeShowSearch }) {
  const {
    handleSubmit,
    register,
    watch,
    setFocus,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const q = watch("q");

  const [result, setResult] = useState([]);

  const [totalItems, setTotalItems] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const fetch = async (_) => {
    setIsLoading(true);

    try {
      const req = await commonHttp.get(`products?title=${q}&itemsPerPage=10`);

      const data = req.data;

      const products = data["hydra:member"];

      setTotalItems(data["hydra:totalItems"]);

      setIsLoading(false);

      if (products.length > 0) {
        setResult(products);
      } else {
        setError("q", { type: "not found" });
        setResult([]);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(async () => {
    const WAIT_INTERVAL = 500;

    const delay = setTimeout(() => {
      if (q && q.length >= 3) {
        fetch();
      }
    }, WAIT_INTERVAL);

    return () => clearTimeout(delay);
  }, [q]);

  const onSubmit = async (data) => {
    await fetch();
  };

  useEffect(() => {
    if (showSearch) {
      setFocus("q");
    }
  }, [showSearch]);

  return (
    <Offcanvas show={showSearch} onHide={closeShowSearch}>
      <Offcanvas.Header closeButton>
        <Form className="me-3" onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Form.Control
              type="text"
              aria-label="Search"
              className={styles.input}
              placeholder="Rechercher un produit...."
              {...register("q", { required: true, minLength: 3 })}
              isInvalid={errors.q}
            />

            <Button
              className={styles.btn}
              type="submit"
              disabled={isSubmitting}
            >
              <FontAwesomeIcon icon={faSearch} />
            </Button>

            <Form.Control.Feedback type="invalid">
              {errors.q && errors.q.type === "required" && (
                <span>Veuillez saisir un nom de produit</span>
              )}

              {errors.q && errors.q.type === "minLength" && (
                <span>Veuillez saisir au moins 3 caractères</span>
              )}
            </Form.Control.Feedback>
          </InputGroup>
        </Form>
      </Offcanvas.Header>

      <Offcanvas.Body style={{ background: "#eee" }}>
        {errors.q && errors.q.type === "not found" && totalItems === 0 && (
          <span className="text-danger text-center d-block mt-5">
            Aucun produit trouvé !
          </span>
        )}

        {isLoading && (
          <div className="d-flex justify-content-center mb-3 mt-3">
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {totalItems > 0 && <Alert variant="info" className="text-center">{totalItems} produit(s) trouvé(s)</Alert>}

        {result.map((product) => (
          <Card key={product.id} className="mb-2">
            <Card.Body>
              <div className="d-flex flex-row align-items-center">
                <div className="me-2">
                  <Link to={`/shop/product/${product.id}/${product.slug.toLowerCase()}`}>
                    <img
                      src={`${apiStorage}/${product.thumbnail}`}
                      className="img-fluid"
                      alt={product.title}
                      style={{ maxHeight: 60 }}
                    />
                  </Link>
                </div>

                <div className="d-flex flex-column">
                  <h5 className="fs-14 mb-0">
                    <Link
                      to={`/shop/product/${product.id}/${product.slug.toLowerCase()}`}
                      onClick={closeShowSearch}
                    >
                      <span className="text-dark">{product.title}</span>
                    </Link>
                  </h5>

                  <span className="text-muted small mb-1 mt-1">
                    {product.category && product.category.title}
                  </span>

                  {product.discount && !product.discount.isExpired ? (
                    <div className="d-flex justify-content-center align-items-center">
                      <span className="text-decoration-line-through text-danger fs-13 me-2">
                        {priceFormater(product.price)}
                      </span>

                      <span className="fs-13 text-success fw-medium">
                        {priceFormater(product.discount.newPrice)}
                      </span>
                    </div>
                  ) : (
                    <span className="fs-13 text-success fw-medium">
                      {priceFormater(product.price)}
                    </span>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}

        {result.length >= 10 && (
          <LinkContainer to={`/search/${q}`} onClick={closeShowSearch}>
            <Button className="d-table mx-auto">Voir tous les résutats</Button>
          </LinkContainer>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
