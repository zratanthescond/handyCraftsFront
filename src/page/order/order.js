import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import Items from "./component/cartItems";
import DeliveryAddress from "./component/deliveryAddress";
import OrderValidation from "./component/orderValidation";
import Payement from "./component/payement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import OrderRewardsPoint from "./component/rewardsPoints";

export default function Order() {
  const { items, discountCode } = useSelector((state) => state.cart);

  if (items.length == 0) {
    return <Redirect to="/cart" />;
  }

  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col md={12}>
          <div className="d-flex text-primary align-items-center mb-4">
            <div className="me-2">
              <FontAwesomeIcon icon={faCheckCircle} size="lg" />
            </div>
            <div>
              <h1 className="fs-28 fw-bold mb-0">
                Finalisation de votre commande
              </h1>
            </div>
          </div>
        </Col>

        <Col md={8}>
          <DeliveryAddress />

          <Payement />

          <OrderRewardsPoint />

          <OrderValidation />
        </Col>

        <Col md={4} className="mt-5 mt-md-0">
          <Items />
        </Col>
      </Row>
    </Container>
  );
}
