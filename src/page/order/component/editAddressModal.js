import { useContext, useEffect, useMemo } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { mutate } from "swr";
import ClientAddressesContext from "../../../context/order/ClientAddressesContext";
import { commonHttp } from "../../../util/http";

function EditAdress({ addressToEdit }) {
  const { showEditAddressModal, setShowEditAddressModal } = useContext(
    ClientAddressesContext
  );

  const { userData } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: useMemo(() => {
      return addressToEdit;
    }, [addressToEdit]),
  });

  useEffect(() => {
    reset(addressToEdit);
  }, [addressToEdit]);

  const handleClose = () => {
    reset();

    setShowEditAddressModal(false);
  };

  const onSubmit = async (data) => {
    try {
      await commonHttp.put(`/user_addresses/${addressToEdit.id}`, {
        ...data,
        postalCode: parseInt(data.postalCode),
      });

      mutate(`/user_addresses?user.id=${userData.id}`);

      setShowEditAddressModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={showEditAddressModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier mon adresse</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Addresse</Form.Label>

            <Form.Control
              as="textarea"
              {...register("address", { required: true })}
              isInvalid={errors.address}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ville</Form.Label>

            <Form.Control
              {...register("town", { required: true })}
              isInvalid={errors.town}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Code postal</Form.Label>

            <Form.Control
              {...register("postalCode", { required: true })}
              isInvalid={errors.postalCode}
            />
          </Form.Group>

          <Button type="submit" disabled={isSubmitting}>
            Modifier
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

const EditAddressModal = EditAdress; // React.memo(EditAdress)

export default EditAddressModal;
