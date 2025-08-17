import axios from "axios";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { apiEndPoint } from "../../config/api/api";
import { commonHttp } from "../../util/http";

export default function ForgetPasswordRequest() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const req = await axios.post(
        `${apiEndPoint}reset_password/token_create`,
        {
          userEmail: data.email,
        }
      );

      toast.success(`Veuillez consulter votre boite email`);
    } catch (error) {
      if (error.response.status == 400 || error.response.status === 404) {
        setError("email", {
          message: error.response.data.error,
          type: "invalid",
        });
      }
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col md={6}>
          <h3 className="fw-bold mb-3">Mot de passe oublié</h3>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                {...register("email", { required: true })}
                isInvalid={errors.email}
              />

              <Form.Control.Feedback type="invalid">
                {errors.email?.type === "invalid" && errors.email.message}
              </Form.Control.Feedback>

              <Form.Text className="text-muted">
                Vous recevez un email pour changer votre mot de passe
              </Form.Text>
            </Form.Group>

            <Button type="submit" disabled={isSubmitting}>
              Envoyer
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
