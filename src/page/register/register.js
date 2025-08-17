import { Col, Form, Row, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import authActions from "../../store/auth/authActions";
import { commonHttp } from "../../util/http";
import { toast } from 'react-toastify';

export default function Register() {

    const { register, handleSubmit, reset,  formState: { errors, isSubmitting } } = useForm();

    const history = useHistory();

    const dispatch = useDispatch();

    const {items: cartItems} = useSelector(state => state.cart);

    const onSubmit = async data => {

          try {
               
            await commonHttp.post("/users", data);

            const authReq = await commonHttp.post(`/login_check`, {username: data.email, password: data.plainPassword });

            const resData = authReq.data;

            reset();
            
            dispatch(authActions.login(resData));

            dispatch(authActions.hideModal());

            toast.success(`Bonjour ${data.firstName}`, {autoClose: 2000});

              if(cartItems.length > 0) {

                history.push("/cart");
              
            } else {

                history.push("/dashboard");
              }

          } catch(error) {
          
             console.log(error);

          }
    }

    return (

       <Form onSubmit={handleSubmit(onSubmit)}>

         <Row>

         <Form.Group as={Col} md="6" className="mb-3">  
       
         <Form.Label>Nom</Form.Label>   

        <Form.Control type="text" 
        {...register("lastName", {required: true})}
        isInvalid={errors.lastName}
        />

         </Form.Group> 

        <Form.Group as={Col} md="6"  className="mb-3">

         <Form.Label>Prénom</Form.Label>       
       
        <Form.Control type="text" 
        {...register("firstName", {required: true})}
        isInvalid={errors.firstName}
        />

        </Form.Group> 


        <Form.Group as={Col} md="6"  className="mb-3">  

         <Form.Label>Email</Form.Label>       
       
        <Form.Control type="email" 
        {...register("email", {required: true})}
        isInvalid={errors.email}
        />

         </Form.Group> 

         <Form.Group as={Col} md="6"  className="mb-3">  

        <Form.Label>Numéro de téléphone</Form.Label>       

         <Form.Control type="text" 
         {...register("phoneNumber", {required: true, minLength: 8, maxLength: 8})}
         isInvalid={errors.phoneNumber}
         />

         </Form.Group> 

         <Form.Group as={Col} md="12"  className="mb-3">

         <Form.Label>Mot de passe</Form.Label>       

         <Form.Control type="password" 
          {...register("plainPassword", {required: true, minLength: 6})}
          isInvalid={errors.plainPassword}
           />

                 <Form.Control.Feedback type="invalid">
                 {errors.plainPassword?.type === "minLength" &&
              "Le mot de passe doit contenir au moins 6 caractères "}
                </Form.Control.Feedback>
 
              </Form.Group>
               


        <Col md={12} className="d-flex justify-content-center">

        <Button disabled={isSubmitting} type="submit" className="pe-5 ps-5">

        { isSubmitting && <Spinner size="sm" animation="grow" variant="light" />}
          
         <span>Créer mon compte</span>
          
          </Button>

        </Col>

        </Row>


       </Form>

    )
}
