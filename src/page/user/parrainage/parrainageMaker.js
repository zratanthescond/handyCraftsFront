import { FloatingLabel, Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { commonHttp } from "../../../util/http";
import DashboardLayout from "../component/dashboardLayout";

export default function ParrainageMaker() {
  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: { isSubmitting, errors },
  } = useForm();

  const { userData } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    try {
      await commonHttp.post("/parrainages/new", {
        ...data,
        userId: userData.id,
      });

      toast.success("Un email vient d'etre envoyé à votre ami");

      reset();
    } catch (error) {
      if (error.response.status === 400) {
        setError("beneficiaryEmail", {
          message: error.response.data.error,
          type: "invalid",
        });
      }
    }
  };

  return (
    <DashboardLayout>
      <h1 className="fs-4 fw-bold mb-3">
        Parrainer un ami et gagner 4 TND de réduction
      </h1>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={12}>
            <FloatingLabel label="Adresse email" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Adresse email"
                isInvalid={errors.beneficiaryEmail}
                {...register("beneficiaryEmail", { required: true })}
              />

              <Form.Control.Feedback type="invalid">
                {errors.beneficiaryEmail?.type === "invalid" &&
                  errors.beneficiaryEmail.message}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel label="Prénom" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Prénom"
                isInvalid={errors.beneficiaryFirstName}
                {...register("beneficiaryFirstName", { required: true })}
              />
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel label="Nom" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Nom"
                isInvalid={errors.beneficiaryLastName}
                {...register("beneficiaryLastName", { required: true })}
              />
            </FloatingLabel>
          </Col>

          <Col md={12} className="text-center">
            <Button type="submit" className="pe-4 ps-4" disabled={isSubmitting}>
              Envoyer
            </Button>
          </Col>
        </Row>
      </Form>
    </DashboardLayout>
  );
}
