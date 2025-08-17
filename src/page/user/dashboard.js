import { useEffect, useMemo } from "react";
import {
  Col,
  FloatingLabel,
  Form,
  Row,
  Button,
  Spinner,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useSWR, { mutate } from "swr";
import { commonHttp } from "../../util/http";
import DashboardLayout from "./component/dashboardLayout";

export default function Dashboard() {
  const { userData } = useSelector((state) => state.auth);

  const url = `/users/${userData.id}`;

  const { data, error } = useSWR(url);

  const birthDay = data?.birthDay ? data.birthDay.substr(0, 10) : null;

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return {
        ...data,
        birthDay: birthDay,
      };
    }, [data]),
  });

  useEffect(() => {
    reset({ ...data, birthDay: birthDay });
  }, [data]);

  const onSubmit = async (infos) => {
    try {
    
      const {email, phoneNumber, birthDay, firstName, lastName} = infos;

      await commonHttp.put(url, {email, phoneNumber, birthDay, firstName, lastName});
      
      mutate(url);
    } catch (err) {
      console.log(err);
    }
  };

  if (!data)
    return (
      <DashboardLayout>
        <Spinner animation="border" variant="primary" />
      </DashboardLayout>
    );

  if (error) return "errors";

  return (
    <DashboardLayout>
      <h1 className="fs-4 fw-bold mb-3">Mes informations personnelles</h1>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6}>
            <FloatingLabel label="Email" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                isInvalid={errors.email}
                {...register("email")}
              />
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel label="Numéro dé téléphone" className="mb-3">
              <Form.Control
                type="number"
                placeholder="Numéro dé téléphone"
                isInvalid={errors.phoneNumber}
                {...register("phoneNumber", {
                  required: true,
                  minLength: 8,
                  maxLength: 8,
                })}
              />
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel label="Nom" className="mb-3">
              <Form.Control
                placeholder="Nom"
                isInvalid={errors.firstName}
                {...register("firstName", { required: true })}
              />
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel label="Prénom" className="mb-3">
              <Form.Control
                placeholder="Prénom"
                isInvalid={errors.lastName}
                {...register("lastName", { required: true })}
              />
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel label="Date de naissance" className="mb-3">
              <Form.Control
                type="date"
                placeholder="Date de naissance"
                {...register("birthDay", {
                  valueAsDate: true,
                })}
              />
            </FloatingLabel>
          </Col>

          <Col md={12} className="text-center">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Spinner
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}

              <span>Mettre à jour</span>
            </Button>
          </Col>
        </Row>
      </Form>
    </DashboardLayout>
  );
}
