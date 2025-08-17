import { useContext, useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import styles from "../style/addToCart.module.scss";
import { useSelector, useDispatch } from "react-redux";
import cartActions from "../../../store/cart/cartActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import StockNotifier from "./product/stockNotifier";
import ProductPageContext from "../../../context/product/ProductPageContext";

export default function AddToCartForm() {
  const { product } = useContext(ProductPageContext);

  const { items } = useSelector((state) => state.cart);

  const productInCart = items.find((item) => item.product.id === product.id);

  const dispatch = useDispatch();

  const history = useHistory();

  const [qty, setQty] = useState(productInCart?.qty || 1);

  const increment = () => {
    if (qty < product.qty) {
      setQty((qty) => qty + 1);
    }
  };

  const decrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const submit = (e) => {
    e.preventDefault();

    dispatch(cartActions.add(product, qty));

    toast.success(`Produit ajouté au panier`, {
      theme: "colored",
      autoClose: 2000,
      className: "bg-primary",
      onClick: () => history.push("/cart"),
    });
  };

  if (product.qty === 0) return <StockNotifier />;

  return (
    <Form
      className={`d-flex flex-md-row flex-column align-items-center justify-content-center ${styles.cart}`}
      onSubmit={submit}
    >
      <Form.Group className="d-flex">
        <Button
          variant="secondary"
          disabled={qty === 1}
          onClick={() => decrement()}
        >
          -
        </Button>

        <FormControl
          type="number"
          value={qty}
          onChange={(event) => setQty(event.target.value)}
          style={{ maxWidth: "80px", margin: "0 8px", textAlign: "center" }}
          readOnly
        />

        <Button
          variant="secondary"
          disabled={qty === product.qty}
          onClick={() => increment()}
        >
          +
        </Button>
      </Form.Group>

      <Button className="ms-md-4 ps-5 pe-5 mt-md-0 mt-4" type="submit">
        <FontAwesomeIcon icon={faCartPlus} />

        <span className="ms-2">
          {productInCart ? "Mettre à jour" : "Ajouter au panier"}
        </span>
      </Button>
    </Form>
  );
}
