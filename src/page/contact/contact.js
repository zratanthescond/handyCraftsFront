import axios from "axios";
import { useMemo } from "react";
import { Card, Row, Col, Container, Form, Button, Spinner} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { apiBaseUrl } from "../../config/api/api";
import { Helmet } from "react-helmet-async";

export default function Contact() {
  
    const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } = useForm();

    const history = useHistory();

    const a = useMemo(() => Math.ceil(10 * Math.random()), []);
   
    const b = useMemo(() => Math.floor(30 * Math.random()), []);

    const isGoodAnswer = answer => answer == (a + b);
    
    const onSubmit = async data => {

        if(!isGoodAnswer(data.answer)) {

            setError("answer", {type: "bad answer", message: "Mauvaise réponse"});

            return;
        }
        try {

            delete data.answer;
          
            await axios.post(`${apiBaseUrl}/contact`, data);

            toast.success(`Merci ${data.firstName}. Votre message a été envoyé avec succès.`);

            reset();

            history.push("/");
        
        }

        catch(err) {

             console.log(err);
        }
    }
  
    return (
      <>
       <Helmet>
        <title>Contact - Paramall</title>
      </Helmet>
    <Container className="mt-3 mb-5">
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <h1 className="fw-bold fs-3">Contactez-nous</h1>

              <p>
                Vous avez une question ou vous recherchez des renseignements ?
                n'hésitez pas à envoyer un message
              </p>

              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Form.Group as={Col} md="6" className="mb-3">
                    <Form.Label>Nom</Form.Label>

                    <Form.Control isInvalid={errors.lastName} type="text" {...register("lastName", {required: true})} />
                  
                  </Form.Group>

                  <Form.Group as={Col} md="6" className="mb-3">
                    <Form.Label>Prénom</Form.Label>

                    <Form.Control isInvalid={errors.firstName} type="text" {...register("firstName", {required: true})} />
                  </Form.Group>

                  <Form.Group as={Col} md="6" className="mb-3">
                    
                    <Form.Label>Numéro de téléphone</Form.Label>

                    <Form.Control isInvalid={errors.phoneNumber} type="number" {...register("phoneNumber", {required: true})}  />
                  </Form.Group>

                  <Form.Group as={Col} md="6" className="mb-3">
                    <Form.Label>Email</Form.Label>

                    <Form.Control isInvalid={errors.email} type="email" {...register("email", {required: true})} />
                  </Form.Group>

                  <Form.Group as={Col} md="12" className="mb-3">
                   
                    <Form.Label>Votre message</Form.Label>

                    <Form.Control isInvalid={errors.message} as="textarea" rows={5} {...register("message", {required: true})} />
                  </Form.Group>

                  <Form.Group as={Col} md="6" className="mb-3">
                    <Form.Label>{a} + {b}</Form.Label>

                    <Form.Control type="text" isInvalid={errors.answer} {...register("answer", {required: true})} />

                    <Form.Text muted>Question de sécurité</Form.Text>

                <Form.Control.Feedback type="invalid">  {errors.answer?.type === "bad answer" && errors.answer.message }</Form.Control.Feedback>
               
                
                  
                  </Form.Group>
                      
                  <Col md={12} className="text-center">
                      
                    <Button disabled={isSubmitting} type="submit" className="pe-5 ps-5">

                      {isSubmitting && <Spinner as="span" animation="border" size="sm" role="status "aria-hidden="true"/> }
                       
                      <span>Envoyer</span>

                    </Button>
                    
                    </Col>    

                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}
