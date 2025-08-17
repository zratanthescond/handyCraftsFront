import { Card, Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { priceFormater } from "../../../util/priceHelper";
import { LinkContainer } from "react-router-bootstrap";
import authActions from "../../../store/auth/authActions";
import DiscountCode from "./discountCode";
import useDeviseDetect from "../../../hook/deviseDetect";
import DesktopCartItems from "./desktopCartItems";
import MobileCartItems from "./mobileCartItems";

export default function CartItems() {
  const { total, subtotal } = useSelector((state) => state.cart);
  console.log(useSelector((state) => state.cart));
  const { isLogged } = useSelector((state) => state.auth);

  const totalPrice = priceFormater(subtotal);

  const dispatch = useDispatch();

  const { isPhone } = useDeviseDetect();

  return (
    <Card>
      <Card.Body>
        {isPhone ? <MobileCartItems /> : <DesktopCartItems />}

        <DiscountCode />

        <div className="d-flex flex-column justify-content-md-end align-items-md-end">
          <div className="d-flex flex-column align-items-end fw-medium">
            <span className="text-success fs-5 fw-bold">
              Sous-total : {totalPrice}
            </span>

            {total >= 99 ? (
              <span className="text-success fw-medium text-muted">
                Livraison gratuite
              </span>
            ) : (
              <span className="text-muted">
                Frais de livraison non inclus pour le moment
              </span>
            )}
          </div>

          <div className="d-flex flex-column flex-md-row mt-4">
            <div className="me-md-3">
              <LinkContainer to="/shop">
                <Button
                  variant="outline-secondary"
                  className="w-100 mb-2 mb-md-0"
                >
                  Continuer mes achats
                </Button>
              </LinkContainer>
            </div>

            <div>
              {isLogged ? (
                <LinkContainer to="/order">
                  <Button variant="primary" className="w-100">
                    Valider ma commande
                  </Button>
                </LinkContainer>
              ) : (
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={() => dispatch(authActions.showModal())}
                >
                  Finaliser votre commande
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
