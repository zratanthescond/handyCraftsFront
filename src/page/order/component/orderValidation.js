import { Form, Button, FloatingLabel, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import cartActions from "../../../store/cart/cartActions";
import { commonHttp } from "../../../util/http";
import GpgPayement from "./gpgPayement";

export default function OrderValidation() {
  const { delivery, 
    items,
     total,
      subtotal,
       payment,
        rewardsPoints, 
        discountCode } =
    useSelector((state) => state.cart);

  const { userData } = useSelector((state) => state.auth);

  const dispatcher = useDispatch();

  const history = useHistory();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const orderData = {
      delivery,
      user: { id: userData.id },
      items,
      note: data.note,
      subtotal,
      total,
      rewardPointsToConsume: rewardsPoints.rewardsPointsToConsume,
    };

    if (discountCode) {
      orderData.discountCodeId = discountCode.id;
    }

    try {
      const req = await commonHttp.post("/orders/make", orderData);

      const { id } = req.data;

      dispatcher(cartActions.clearCart());

      toast.success("Votre commande est validée");

      history.push(`/dashboard/orders/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  if (!payment) return null;

  if(payment === "Paiement par carte bancaire") return <GpgPayement />;

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FloatingLabel label="Note concernant votre commande">
          <Form.Control
            as="textarea"
            placeholder="Note concernant votre commande"
            style={{ height: "100px" }}
            {...register("note")}
          />
        </FloatingLabel>

        <Button
          className="pe-4 ps-4 d-table mt-3 mx-auto"
          type="submit"
          disabled={isSubmitting}
        >
          {!isSubmitting ? (
            <span>Valider votre commande</span>
          ) : (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </Button>
      </Form>

        

    </>
  );
}
