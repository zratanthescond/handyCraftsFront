import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";
import cartActions from "../../store/cart/cartActions";

export function PaymentOk() {
  const history = useHistory();

  const { paymentRef } = useSelector((state) => state.cart);

  console.log(paymentRef);

  const dispatch = useDispatch();

  const { data: orderData } = useSWR(
    `/orders?payementTransaction.ref=${paymentRef}`
  );

  useEffect(() => {
    if (orderData) {
      const order = orderData["hydra:member"][0];

      dispatch(cartActions.clearCart());

      toast.success("Votre commande est validée");

      history.push(`/dashboard/orders/${order.id}`);
    }
  }, [orderData]);

  return null;
}

export function PaymentKo() {
  const history = useHistory();

  toast.error("Paiement échoué");

  history.push(`/order`);

  return null;
}
