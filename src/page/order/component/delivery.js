import { Alert, Card, Form, Spinner } from "react-bootstrap";
import useSWR from "swr";
import { priceFormater } from "../../../util/priceHelper";
import styles from "./style/formStyle.module.scss";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartActions from "../../../store/cart/cartActions";
import ClientAddressesContext from "../../../context/order/ClientAddressesContext";

export default function DeliveryType() {
  const url = `/delivery_types`;

  const { data, error } = useSWR(url);

  const { register, watch } = useForm();

  const deliveryValue = watch("delivery");

  const dispatch = useDispatch();

  const { delivery } = useSelector((state) => state.cart);

  const { addresses } = useContext(ClientAddressesContext);

  useEffect(() => {
    if (deliveryValue) {
      let deliveryType = data["hydra:member"].find(
        (d) => d.id == deliveryValue
      );

      dispatch(cartActions.addDelivery(deliveryType));
    }

    /// Default aramex

    if (data && !deliveryValue && !delivery) {
      const aramaxId = 2;

      let deliveryType = data["hydra:member"].find((d) => d.id === aramaxId);

      dispatch(cartActions.addDelivery(deliveryType));
    }
  }, [deliveryValue, data]);

  if (error) return "Une erreure est survenue";

  if (!data) return <Spinner animation="border" />;

  return (
    <Card className="mb-3">
      <Card.Header>
        <span className="fw-bold fs-5">2. Mode de livraison</span>
      </Card.Header>

      <Card.Body>
        {addresses.length > 0 ? (
          <>
            <p className="fs-20">
              Comment voulez-vous que votre commande soit livrée ?
            </p>

            <Form>
              {data["hydra:member"].map((item) => (
                <div
                  key={item.id}
                  className="mb-3 d-flex flex-column border p-3"
                >
                  <div className="d-flex flex-row">
                    <Form.Check
                      className={styles.formCheck}
                      type="radio"
                      label={item.name}
                      value={item.id}
                      defaultChecked={delivery && delivery.id === item.id}
                      {...register("delivery")}
                    />
                    <div
                      className="bg-light text-success pt-1 pb-2 pe-2 ps-2 rounded ms-2 fw-normal"
                      style={{ fontSize: "13px" }}
                    >
                      {item.price > 0
                        ? priceFormater(item.price)
                        : "Livraison gratuite"}
                    </div>
                  </div>
                  <div>
                    <small className="mt-1">{item.description}</small>
                  </div>
                </div>
              ))}
            </Form>
          </>
        ) : (
          <Alert variant="danger" className="text-center fw-medium">
            Veuillez ajouter une adresse de livraison
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}
