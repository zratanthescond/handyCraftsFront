import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { apiEndPoint } from "../../config/api/api";
import authActions from "../../store/auth/authActions";

export default function ResetPassword() {
  const { token } = useParams();

  const dispath = useDispatch();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const req = await axios.post(`${apiEndPoint}reset_password/reset`, {
        token: token,
        newPassword: data.password,
      });

      const userData = await req.data;

      console.log(userData);

      toast.success(
        `Bonjour ${userData.userName} votre mot de mot a a été changé`
      );

      dispath(authActions.showModal());
    } catch (error) {
      if (error.response.status == 400 || error.response.status === 404) {
        setError("password", {
          message: error.response.data.error,
          type: "invalid",
        });
      }
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col md={12}>
          <h3 className="fw-bold mb-3">Changer votre mot de passe</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Nouveau mot de passe</Form.Label>

              <Form.Control
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                isInvalid={errors.password}
              />

              <Form.Control.Feedback type="invalid">
                {errors.password?.type === "invalid" && errors.password.message}
                {errors.password?.type === "minLength" &&
                  "Votre mot de passe doit contenir au minimum 6 caractères"}
              </Form.Control.Feedback>
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
