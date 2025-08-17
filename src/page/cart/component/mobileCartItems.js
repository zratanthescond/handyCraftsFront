import { useDispatch, useSelector } from "react-redux";
import { apiStorage } from "../../../config/api/api";
import { Button, Card, Row, Col } from "react-bootstrap";
import { priceFormater } from "../../../util/priceHelper";
import { Link } from "react-router-dom";
import cartActions from "../../../store/cart/cartActions";
import ProductQuantity from "./productQuantity";

export default function MobileCartItems() {
  const { items } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  return (
    <div>
      {items.map((item) => (
        <Card key={item.product.id} className="mb-3">
          <Card.Body>
            <Row>
              <Col xs={3}>
                <Link to={`/shop/product/${item.product.id}/${item.product.slug.toLowerCase()}`}>
                  <img
                    src={`${apiStorage}/${item.product.thumbnail}`}
                    className="img-fluid"
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                    alt=""
                  />
                </Link>
              </Col>

              <Col xs={9} className="p-1">
                <h5 className="fw-medium fs-15 mb-1">
                  <Link
                    className="text-dark"
                    to={`/shop/product/${item.product.id}/${item.product.slug.toLowerCase()}`}
                  >
                    {item.product.title}
                  </Link>
                </h5>

                {item.product.discount && !item.product.discount.isExpired ? (
                  <div className="d-flex flex-row justify-content-arround">
                    <div className="d-flex flex-column">
                      <span className="text-decoration-line-through text-danger fs-13 me-2">
                        {priceFormater(item.product.price)}
                      </span>

                      <span className="fs-14 text-success">
                        {priceFormater(item.product.discount.newPrice)}
                      </span>
                    </div>

                    <div className="d-flex align-self-center text-white ms-3">
                      <span
                        className="fs-11 fw-normal rounded-circle text-white d-flex align-items-center justify-content-center"
                        style={{
                          height: 40,
                          width: 40,
                          background: "#ff6b81",
                        }}
                      >
                        - {item.product.discount.pourcentage} %
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="text-success fs-14">
                    {priceFormater(item.product.price)}
                  </span>
                )}
              </Col>
            </Row>
          </Card.Body>

          <Card.Footer className="d-flex justify-content-between bg-white">
            <div>
              <Button
                variant="link"
                className="text-danger"
                size="sm"
                onClick={() => dispatch(cartActions.remove(item.product))}
              >
                Retirer
              </Button>
            </div>
            <div>
              <ProductQuantity item={item} />
            </div>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
}
