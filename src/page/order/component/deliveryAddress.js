import { Card, Button, Spinner } from "react-bootstrap";
import useSWR from "swr";
import { useState } from "react";
import AdressesList from "./adressesList";
import { NewAdressForm } from "./newAddressForm";
import ClientAddressesContext from "../../../context/order/ClientAddressesContext";
import { useSelector } from "react-redux";
import DeliveryType from "./delivery";

export default function DeliveryAddress() {


  const {userData} = useSelector(state => state.auth);

  const url = `/user_addresses?user.id=${userData.id}`;  
  
  const { data: adressesData } = useSWR(url);

    const addresses = adressesData ? adressesData["hydra:member"] : [];
 
    const [showModal, setShowModal] = useState(false);

    const [showNewAdressModal, setShowNewAdressModal] = useState(false)

    const [showEditAddressModal, setShowEditAddressModal] = useState(false);

    const defaultAdress = addresses.find(add => add.isDefault === true);

    const contextValues = {
    
      showModal, 
      setShowModal, 
      addresses, 
      showNewAdressModal, 
      setShowNewAdressModal, 
      showEditAddressModal, 
      setShowEditAddressModal,
      defaultAdress
    };

    if(!adressesData) return <Spinner animation="border" variant="primary" />

    return (

        <>

         <ClientAddressesContext.Provider value={contextValues}>

         <Card className="mb-3">

          <Card.Header className="d-flex justify-content-between align-items-center">
            
            <span className="fw-bold fs-5">1. Adresse</span>

            { addresses && addresses.length > 0 && <Button variant="outline-primary" onClick={() => setShowModal(true)}>Gérer mes adresses</Button> }
              
              
            </Card.Header>   

         <Card.Body>

         { addresses && addresses.length === 0 && <NewAdressForm /> }
         
           
           {

                defaultAdress &&

                  <div className="d-flex flex-column">

                    <span className="mb-3">{userData.fullName}</span>
                    <span>{ defaultAdress.address }, {defaultAdress.town}, {defaultAdress.postalCode}</span>

                </div>
           
           }

 

         </Card.Body>

         </Card>


        <AdressesList /> 

        <DeliveryType />

        </ClientAddressesContext.Provider> 


         </>



    )
}