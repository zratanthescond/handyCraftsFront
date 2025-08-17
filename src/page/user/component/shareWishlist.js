import { useState } from "react";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { apiBaseUrl } from "../../../config/api/api";
import { commonHttp } from "../../../util/http";

export default function ShareWishlist() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { id: userId } = useSelector((state) => state.auth.userData);

  const onSubmit = async (data) => {
    data.userId = userId;

    try {
      await commonHttp.post(`${apiBaseUrl}/share/wishlist`, data);

      toast.success(`Votre wishlist a été envoyé à ${data.recipientName}.`);

      handleClose();

      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        Partager mon Wishlist
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Partager mon Wishlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Montrer à vos amis les produits que vous souhaitez commander !</p>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <FloatingLabel label="Email du destinataire" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                isInvalid={errors.recipientEmail}
                {...register("recipientEmail", { required: true })}
              />
            </FloatingLabel>
            <FloatingLabel label="Nom du destinataire">
              <Form.Control
                type="text"
                placeholder="Nom du destinataire"
                isInvalid={errors.recipientName}
                {...register("recipientName", { required: true })}
              />
            </FloatingLabel>

            <Button type="submit" className="mt-3 d-table mx-auto" disabled={isSubmitting}>
              Envoyer
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
