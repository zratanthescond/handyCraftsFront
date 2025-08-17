import { useContext, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ProductPageContext from "../../../../context/product/ProductPageContext";
import { commonHttp } from "../../../../util/http";

export default function StockNotifier() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  const { product } = useContext(ProductPageContext);

  const onSubmit = async (data) => {
    try {
      await commonHttp.post("/product_stock_subscriptions", {
        ...data,
        product: product["@id"],
      });

      handleClose();

      setIsSubscribed(true);

      toast.success(
        `Merci ${data.firstName}, vous serez informé quand le produit est disponible`
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (!product.isApprovisionnable || isSubscribed) return null;

  return (
    <>
      <div className="d-flex justify-content-center">
        <Button onClick={handleShow} variant="success" size="sm">
          Notifier moi quand le produit est disponible
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <h5 className="fs-5 fw-bold mb-0">
            Nous vous informons quand le produit est de nouveau disponible
          </h5>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <FloatingLabel label="Nom">
                <Form.Control
                  className="mb-3"
                  placeholder="Nom"
                  {...register("lastName", { required: true })}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group>
              <FloatingLabel label="Prénom">
                <Form.Control
                  className="mb-3"
                  placeholder="Prénom"
                  {...register("firstName", { required: true })}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group>
              <FloatingLabel label="Email">
                <Form.Control
                  className="mb-3"
                  placeholder="Email"
                  type="email"
                  {...register("email", { required: true })}
                />
              </FloatingLabel>
            </Form.Group>

            <Button
              type="submit"
              className="d-table mx-auto pe-4 ps-4"
              disabled={isSubmitting}
            >
              Envoyer
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
