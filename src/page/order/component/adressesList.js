import {
  faEdit,
  faPlusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Modal, Button, ListGroup, Form } from "react-bootstrap";
import EditAddressModal from "./editAddressModal";
import NewAdressModal from "./newAdressModal";
import { commonHttp } from "../../../util/http";
import { mutate } from "swr";
import ClientAddressesContext from "../../../context/order/ClientAddressesContext";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function AdressesList() {
  const {
    showModal,
    setShowModal,
    addresses,
    setShowNewAdressModal,
    showEditAddressModal,
    setShowEditAddressModal,
  } = useContext(ClientAddressesContext);

  const [addressToEdit, setAddressToEdit] = useState({});

  const { userData } = useSelector((state) => state.auth);

  const openNewAdresseModal = () => {
    setShowNewAdressModal(true);

    setShowModal(false);
  };

  const openEditAddressModal = (address) => {
    setAddressToEdit(address);

    setShowEditAddressModal(true);

    setShowModal(false);
  };

  const deleteAddress = async (addressId) => {
    try {
      const newAdresses = addresses.filter((add) => add.id !== addressId);

      addresses["hydra:member"] = newAdresses;

      mutate(`/user_addresses?user.id=${userData.id}`, addresses);

      await commonHttp.delete(`/user_addresses/${addressId}`);
    } catch (er) {}
  };

  const { watch, register } = useForm();

  const choosenAdress = watch("address");

  useEffect(() => {
    async function setDefaultAddress() {
      await commonHttp.put(`/user_addresses/${choosenAdress}`, {
        isDefault: true,
      });

      mutate(`/user_addresses?user.id=${userData.id}`);
    }

    if (choosenAdress) {
      
      setShowModal(false);
      setDefaultAddress();
    }
  }, [choosenAdress]);

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Carnet d’adresses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3 pb-3 border-bottom">
            {addresses.length <= 4 && (
              <Button variant="outline-primary" onClick={openNewAdresseModal}>
                <FontAwesomeIcon icon={faPlusCircle} />
                <span className="ms-2">Ajouter une nouvelle adresse</span>
              </Button>
            )}
          </div>

          <Form>
            <ListGroup variant="flush">
              {addresses &&
                addresses.map((el) => (
                  <ListGroup.Item
                    key={el.id}
                    className="d-flex justify-content-between mb-3 pb-3"
                  >
                    <div className="d-flex flex-column">
                      {el.isDefault && (
                        <span className="text-muted text-uppercase mb-2">
                          Adresse par défault
                        </span>
                      )}

                      <Form.Check
                        type="radio"
                        label={` ${el.address}, ${el.town} ${el.postalCode}`}
                        value={el.id}
                        defaultChecked={el.isDefault}
                        {...register("address")}
                      />
                    </div>

                    <div className="d-flex flex-column">
                      <Button
                        variant="link text-muted"
                        size="sm"
                        onClick={() => openEditAddressModal(el)}
                      >
                        <FontAwesomeIcon icon={faEdit} />

                        <span className="ms-2">Modifier</span>
                      </Button>

                      {!el.isDefault && (
                        <Button
                          variant="link text-danger"
                          size="sm"
                          onClick={() => deleteAddress(el.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />

                          <span className="ms-2">Supprimer</span>
                        </Button>
                      )}
                    </div>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Form>
        </Modal.Body>
      </Modal>

      <NewAdressModal />

      <EditAddressModal addressToEdit={addressToEdit} />
    </>
  );
}
