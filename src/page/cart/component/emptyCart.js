import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function EmptyCart() {
  const emptyIconStyle = {
    height: "100px",
    width: "100px",
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div
        style={emptyIconStyle}
        className="mb-3 shadow rounded-circle text-white d-flex justify-content-center align-items-center bg-white"
      >
        <FontAwesomeIcon icon={faShoppingBasket} size="3x" color="#ccc" />
      </div>

      <div className="text-muted mb-3 fs-18 fw-medium">
        Votre panier est vide
      </div>

      <LinkContainer to="/shop">
        <Button>Commencez vos achats</Button>
      </LinkContainer>
    </div>
  );
}
