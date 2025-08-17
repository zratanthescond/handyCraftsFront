import { Alert, Card, Form } from "react-bootstrap";
import styles from "./style/formStyle.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import cartActions from "../../../store/cart/cartActions";

export default function Payement() {
  const paymentTypes = [
    {
      name: "Paiement par carte bancaire",
      description: "Paiement totalement sécurisé, assuré par ClicToPay.",
    },

    {
      name: "Paiement à la livraison",
      description: "Vous payez votre commande à la réception.",
    },
  ];

  const { register, watch, reset } = useForm();

  const paymentType = watch("payement_type");

  const { delivery, payment } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {

     if(paymentType) {

       dispatch(cartActions.addPayment(paymentType));

       reset();
     }

  }, [paymentType])

  return (
    <Card className="mb-3">
      <Card.Header className="d-flex">
        <span className="fw-bold fs-5">3. Mode de paiement</span>
      </Card.Header>

      <Card.Body>
        <Form>
          {delivery ? (
            paymentTypes.map((type) => (
              <div
                key={Math.random()}
                className="mb-3 d-flex flex-column border p-3"
              >
                <div className="d-flex flex-row">
                  <Form.Check
                    className={styles.formCheck}
                    type="radio"
                    label={type.name}
                    value={type.name}
                    defaultChecked={payment && type.name === payment}
                    {...register("payement_type")}
                  />
                </div>
                <div>
                  <small className="mt-1">{type.description}</small>
                </div>
              </div>
            ))
          ) : (
            <Alert variant="danger" className="text-center fw-medium">
              Veuillez selectionner un mode de livraison
            </Alert>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
}
