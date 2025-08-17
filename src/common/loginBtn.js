import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Modal, Tabs, Tab, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { commonHttp } from "../util/http";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../store/auth/authActions";
import { useState } from "react";
import Register from "../page/register/register";
import useDeviseDetect from "../util/deviseDetect";


export default function Login() {
  const dispath = useDispatch();

  const { userData, isLogged, modal } = useSelector((state) => state.auth);

  const { items: cartItems } = useSelector((state) => state.cart);

  const [key, setKey] = useState("login");

  const {isPhone} = useDeviseDetect();

  const handleClose = () => {
    reset();

    dispath(authActions.hideModal());
  };

  const handleShow = () => {
    if (isLogged) {
      history.push("/dashboard");
    } else {
      dispath(authActions.showModal());
    }
  };

  const history = useHistory();

  const showForgetPasswordRequest = () => {
    dispath(authActions.hideModal());
    history.push("/forgetpassword/request");
  };

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const req = await commonHttp.post(`/login_check`, data);

      const resData = await req.data;

      handleClose();

      reset();

      dispath(authActions.login(resData));

      toast.success(`Bonjour ${resData.userData.firstName}`, {
        autoClose: 2000,
      });

      if (cartItems.length > 0) {
        history.push("/cart");
      } else {
        history.push("/dashboard");
      }
    } catch (e) {
      console.log(e);

      setError("password", {
        message: "Email et/ou mot de passe incorrect(s)",
        type: "credential",
      });
    }
  };

  return (
    <>
      <Button
        variant="link"
        className="shadow-none d-flex flex-row align-items-center position-relative p-0"
        onClick={handleShow}
      >
        <FontAwesomeIcon icon={faUser} size={ isPhone ? "lg" : "2x"} className="me-1" />

        <div className="d-flex flex-column ms-2 text-start">
          <span className="d-none d-md-flex fw-medium">
            {isLogged ? userData.firstName : "Bienvenue"}
          </span>

          <span className="text-muted small fw-light d-none d-md-flex">
            Mon compte
          </span>
        </div>
      </Button>

      <Modal show={modal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="mb-0 fs-5 fw-bold">
            {key === "login" ? "Se connecter" : "Créer un compte"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            className="mb-3 justify-content-center"
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <Tab eventKey="login" title="Se connecter">
              <div className="d-flex flex-column justify-content-center">
                <Form
                  onSubmit={handleSubmit(onSubmit)}
                  className="d-flex flex-column mb-3"
                >
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>

                    <Form.Control
                      type="email"
                      {...register("username", { required: true })}
                      isInvalid={errors.password}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Mot de passe</Form.Label>

                    <Form.Control
                      type="password"
                      {...register("password", { required: true })}
                      isInvalid={errors.password}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.password?.type === "credential" &&
                        errors.password.message}
                    </Form.Control.Feedback>

                    <Button
                      variant="link btn-sm text-danger shadow-none mt-2 fw-light"
                      onClick={showForgetPasswordRequest}
                    >
                      J'ai oublié mon mot de passe
                    </Button>
                  </Form.Group>

                  <Button
                    variant="outline-primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    )}

                    <span>Se connecter</span>
                  </Button>
                </Form>
              </div>
            </Tab>

            <Tab eventKey="registration" title="Inscription">
              <Register />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
}
