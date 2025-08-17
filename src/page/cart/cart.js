import { Col, Container, Row, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import CartItems from "./component/cartItems";
import EmptyCart from "./component/emptyCart";

export default function Cart() {
  
  const { cartIsEmpty, items } = useSelector((state) => state.cart);

  return (
    <Container className="mt-md-5 mt-4 mb-5">
      <Row>
        <Col md={12}>
          <div className="d-flex align-items-center mb-3">
            <div className="me-2">
              <h1 className="fs-3 fw-bold mb-0">Mon panier</h1>
            </div>

            {!cartIsEmpty && (
              <div>
                <Badge bg="secondary" className="fw-normal">
                  {items.length} Produit{items.length > 1 && "s"}
                </Badge>
              </div>
            )}
          </div>

          {cartIsEmpty ? <EmptyCart /> : <CartItems />}
        </Col>
      </Row>
    </Container>
  );
}
