import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, ListGroup, Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { apiStorage } from "../../../config/api/api";
import { priceFormater } from "../../../util/priceHelper";

export default function Items() {
  const { items, total, subtotal, delivery, discountCode, rewardsPoints } =
    useSelector((state) => state.cart);

  const { rewardsPointsToConsume, rewardsPointsDiscount } = rewardsPoints;

  const totalPrice = priceFormater(total);

  return (
    <Card>
      <Card.Header>
        <h4 className="fw-bold fs-5 mb-0 text-center">
          Votre commande {items.length} article{items.length > 1 && "s"}
        </h4>
      </Card.Header>

      <Card.Body>
        <ListGroup variant="flush">
          {items.map((item) => (
            <ListGroup.Item key={item.product.id}>
              <Row className="align-items-center">
                <Col xs={3}>
                  <img
                    src={`${apiStorage}/${item.product.thumbnail}`}
                    className="img-fluid"
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                    alt=""
                  />
                </Col>

                <Col xs={9} className="d-flex flex-column">
                  <span className="fw-normal mb-1" style={{ fontSize: "16px" }}>
                    {item.product.title}
                  </span>

                  <span
                    className="text-success fw-medium"
                    style={{ fontSize: "14px" }}
                  >
                    {item.product.discount &&
                    !item.product.discount.isExpired ? (
                      <>
                        <span className="text-decoration-line-through text-danger small me-2">
                          {priceFormater(item.product.price)}
                        </span>

                        <span>
                          {priceFormater(item.product.discount.newPrice)}
                        </span>
                      </>
                    ) : (
                      <span>{priceFormater(item.product.price)}</span>
                    )}
                  </span>

                  <span
                    className="text-muted small fw-medium"
                    style={{ fontSize: "14px" }}
                  >
                    Quantité : {item.qty}
                  </span>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}

          <ListGroup.Item className="d-flex justify-content-between fs-6 fw-medium">
            <span>Sous total</span>
            <span>{priceFormater(subtotal)}</span>
          </ListGroup.Item>

          {discountCode && (
            <ListGroup.Item className="d-flex justify-content-between text-danger fs-6 fw-medium">
              <span>Code promo { discountCode.code }</span>
              <span>-{discountCode.percentage}%</span>
            </ListGroup.Item>
          )}

          {delivery && (
            <ListGroup.Item className="d-flex justify-content-between fs-6 fw-medium">
              <span>Frais de livraison</span>
              <span>{priceFormater(delivery.price)}</span>
            </ListGroup.Item>
          )}

          {rewardsPointsToConsume > 0 && (
            <ListGroup.Item className="d-flex justify-content-between text-danger fs-6 fw-medium">
              <span>{rewardsPointsToConsume} Points de fidélité</span>
              <span>- {priceFormater(rewardsPointsDiscount)}</span>
            </ListGroup.Item>
          )}

          {delivery && delivery.price > 0 && subtotal > 99 && (
            <ListGroup.Item className="d-flex justify-content-between text-danger fs-6 fw-medium">
              <span>Livraison gratuite</span>
              <span>- {priceFormater(delivery.price)}</span>
            </ListGroup.Item>
          )}

          <ListGroup.Item className="d-flex justify-content-between text-success fs-6 fw-medium">
            <span>Total</span>
            <span>{totalPrice}</span>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>

      <Card.Footer className="justify-content-center d-flex">
        <LinkContainer to="/cart">
          <Button variant="outline-secondary">
            <FontAwesomeIcon icon={faChevronLeft} />
            <span className="ms-3">Retour au panier</span>
          </Button>
        </LinkContainer>
      </Card.Footer>
    </Card>
  );
}
