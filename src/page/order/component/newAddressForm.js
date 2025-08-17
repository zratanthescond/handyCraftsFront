import { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { mutate } from 'swr';
import ClientAddressesContext from "../../../context/order/ClientAddressesContext";
import { commonHttp } from "../../../util/http";

export function NewAdressForm() {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const {userData} = useSelector(state => state.auth);

    const {setShowNewAdressModal} = useContext(ClientAddressesContext);

    const onSubmit = async data => {

        try {
             
           await commonHttp.post("/user_addresses", 
           
           {...data, 
           user: `/api/users/${userData.id}`, 
           postalCode: parseInt(data.postalCode),
           isDefault: true
           
           }
           
           );
           
           setShowNewAdressModal(false);

           mutate(`/user_addresses?user.id=${userData.id}`);
           
        }
 
        catch(error) {
 
           console.log(error);
        }
    }

    return (

        <Form onSubmit={handleSubmit(onSubmit)}>

<Form.Group className="mb-3">

<Form.Label>Adresse compléte</Form.Label>  

 <Form.Control as="textarea" {...register("address", {required: true})} isInvalid={errors.address} />

 </Form.Group>

  <Form.Group className="mb-3">

<Form.Label>Ville</Form.Label>  

 <Form.Control {...register("town", {required: true})} isInvalid={errors.town} />

 </Form.Group>

  <Form.Group className="mb-3">

 <Form.Label>Code postal</Form.Label>  

 <Form.Control type="number" {...register("postalCode", {required: true})} isInvalid={errors.postalCode} />

 </Form.Group> 

 <Button type="submit" disabled={isSubmitting}>Ajouter</Button>  

 </Form>
    
    )
}