import { useContext } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import ClientAddressesContext from "../../../context/order/ClientAddressesContext";
import { NewAdressForm } from "./newAddressForm";

export default function NewAdressModal () {

  const {showNewAdressModal, setShowNewAdressModal} = useContext(ClientAddressesContext);

     return (

        <Modal show={showNewAdressModal} onHide={() => setShowNewAdressModal(false)}>

         <Modal.Header closeButton>
          <Modal.Title>Nouvelle adresse</Modal.Title>
        </Modal.Header>
          
          <Modal.Body>
           
          <NewAdressForm />
        

          </Modal.Body>

        </Modal>
     )
}