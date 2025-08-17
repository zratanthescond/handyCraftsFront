import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import cartActions from "../../../store/cart/cartActions";

export default function ProductQuantity({ item }) {
  const dispatch = useDispatch();

  const { product, qty } = item;

  const increment = () => {
    if (qty < product.qty) {
      dispatch(cartActions.updateProductQty(product.id, qty + 1));
    }
  };

  const decrement = () => {
    if (qty > 1) {
      dispatch(cartActions.updateProductQty(product.id, qty - 1));
    }
  };

  return (
    <div className="d-flex align-items-center">
      <Button
        variant="outline-primary"
        size="sm"
        disabled={qty === 1}
        onClick={decrement}
      >
        -
      </Button>

      <div className="text-muted fs-14 me-2 ms-2 border pt-1 pb-1 ps-3 pe-3 rounded">
        {qty}
      </div>

      <Button
        variant="outline-primary"
        size="sm"
        disabled={qty === product.qty}
        onClick={increment}
      >
        +
      </Button>
    </div>
  );
}
