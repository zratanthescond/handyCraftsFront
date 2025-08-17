import { faCartPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { apiStorage } from "../config/api/api";
import styles from "./style/productBlock.module.scss";
import { Button, Col, ListGroup, Modal, Row } from "react-bootstrap";
import { priceFormater } from "../util/priceHelper";
import { useDispatch, useSelector } from "react-redux";
import cartActions from "../store/cart/cartActions";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Countdown from "react-countdown";
import { useState } from "react";

export default function ProductBlock({ product }) {
  const [show, setShow] = useState(false);

  const closeQuickView = () => setShow(false);

  const openQuickView = () => setShow(true);

  const items = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  const history = useHistory();

  const addToCart = () => {
    toast.success(`Produit ajouté au panier`, {
      theme: "colored",
      autoClose: 2000,
      className: "bg-primary",
      onClick: () => history.push("/cart"),
    });

    dispatch(cartActions.add(product, 1));
  };

  const inCart = items.some((item) => item.product.id === product.id);

  const Title = () => {
    return (
      <h3 className="fs-16 mb-0">
        {product.title.length > 40
          ? `${product.title.substr(0, 40)}...`
          : product.title}
      </h3>
    );
  };

  const Description = () => {
    return (
      <>
        {product.description.length <= 150 ? (
          <p>{product.description}</p>
        ) : (
          <p>{`${product.description.substring(0, 150)}...`}</p>
        )}
      </>
    );
  };

  const Completionist = () => <span>Promotion terminée !</span>;

  const rendererCountDown = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      //mutate(url);
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <ul
          className={`d-flex justify-content-center list-inline ${styles.countDown}`}
        >
          <li>
            <span>{days}</span>
            <span>J</span>
          </li>
          <li>
            <span>{hours}</span>
            <span>H</span>
          </li>
          <li>
            <span>{minutes}</span>
            <span>M</span>
          </li>
          <li>
            <span>{seconds}</span>
            <span>S</span>
          </li>
        </ul>
      );
    }
  };

  return (
    <>
      <div className={styles.product}>
        {product.discount && !product.discount.isExpired && (
          <div className={styles.promo}>- {product.discount.pourcentage}%</div>
        )}
        <Link to={`/shop/product/${product.id}/${product.slug.toLowerCase()}`}>
          <img
            src={`${apiStorage}/${product.thumbnail}`}
            className="img-fluid d-block mx-auto"
            alt={product.title}
          />
        </Link>
        <Title />
        <span className="text-muted small mb-2 mt-1">
          {product.category && product.category.title}
        </span>

        {product.discount && !product.discount.isExpired && (
          <Countdown
            date={product.discount.expireAt}
            renderer={rendererCountDown}
          />
        )}

        {product.discount && !product.discount.isExpired ? (
          <div className="d-flex justify-content-center align-items-center">
            <span className="text-decoration-line-through text-danger small me-2">
              {priceFormater(product.price)}
            </span>

            <span className={styles.price}>
              {priceFormater(product.discount.newPrice)}
            </span>
          </div>
        ) : (
          <span className={styles.price}>{priceFormater(product.price)}</span>
        )}

        {!inCart && product.qty > 0 && (
          <div className={styles.action}>
            <div className="me-2">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={openQuickView}
              >
                <FontAwesomeIcon icon={faEye} />
              </Button>
            </div>

            <div>
              <Button
                className={styles.addToCart}
                size="sm"
                onClick={addToCart}
              >
                <FontAwesomeIcon icon={faCartPlus} />
                <span className="ms-2">Ajouter au panier</span>
              </Button>
            </div>
          </div>
        )}

        {inCart && (
          <small className="text-muted fw-light">
            Produit ajouté au panier
          </small>
        )}

        {product.qty === 0 && (
          <span className="text-danger small fw-light">
            En rupture de stock
          </span>
        )}
      </div>

      <Modal show={show} onHide={closeQuickView}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Title />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Link to={`/shop/product/${product.id}/${product.slug.toLowerCase()}`}>
            <img
              src={`${apiStorage}/${product.thumbnail}`}
              className="img-fluid d-block mx-auto"
              style={{ maxHeight: 200 }}
              alt={product.title}
            />
          </Link>

          <div className="fs-md-16 fs-14 fw-light">
            <Description />
          </div>

          <ListGroup variant="flush">
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
          </ListGroup>

          {!inCart && product.qty > 0 && (
            <Button className={`${styles.addToCart} d-table mx-auto`} size="md" onClick={addToCart}>
              <FontAwesomeIcon icon={faCartPlus} />
              <span className="ms-2">Ajouter au panier</span>
            </Button>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
