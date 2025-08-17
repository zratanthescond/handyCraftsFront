import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import {
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  ListGroup,
  Row,
  Button,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import useSWR from "swr";
import { apiStorage } from "../../config/api/api";

export default function ProductReview() {
  const { orderId } = useParams();

  const { data: order, error } = useSWR(`/orders/${orderId}`);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [reviews, setReviews] = useState({
    6: { note: null, comment: null },
  });

  const onSubmit = async (data) => {
    for (const [k, v] of Object.entries(data)) {
      
       let productId = k.replace(/[^0-9]+/, "");

       let field = k.replace(/[0-9]/g, "");

       console.log(v);

      if (reviews.hasOwnProperty(productId)) {
          console.log(field);
        setReviews((prev) => ({
          ...prev,
          productId: {
            field: v,
          },
        }));
      }
    }

    try {
      // commonHttp.put(`/orders/${orderId}`, {productReviews});
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    console.log(reviews);
  }, [reviews]);

  if (!order) return null;

  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Row>
                <Col md={{ span: 8, offset: 2 }}>
                  <div className="text-center">
                    <FontAwesomeIcon
                      icon={faCommentAlt}
                      size="2x"
                      className="text-primary text-center mb-2 mt-4"
                    />
                    <h1 className="fw-bold text-primary mb-2">Avis produits</h1>
                    <p className="mb-1 fw-bold">
                      Partagez vos expériences avec les autres visiteurs et vous
                      les aidez dans leurs achats.
                    </p>
                    <p>
                      Les marques vous écoutent ! Elles consultent Beauté-test
                      pour identifier les tendances, évaluer les retours, se
                      comparer aux autres marques... Vous participez ainsi à la
                      mise sur le marché de produits qui répondent plus à nos
                      besoins.
                    </p>
                  </div>

                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <ListGroup variant="flush">
                      {order.products.map((item) => (
                        <ListGroup.Item
                          key={item.id}
                          className="pt-3 pb-3 mt-1 mb-1 ps-0 pe-0"
                        >
                          <div className="d-flex mb-3 align-items-center">
                            <img
                              src={`${apiStorage}/${item.product.thumbnail}`}
                              className="img-fluid"
                              style={{
                                width: "50px",
                                height: "50px",
                                marginRight: "10px",
                              }}
                              alt=""
                            />

                            <h5 className="mb-0">{item.product.title}</h5>
                          </div>

                          <FloatingLabel className="mb-3" label="Note sur 5">
                            <Form.Select
                              {...register(`note${item.product.id}`, {
                                required: true,
                              })}
                            >
                              {Array.from({ length: 5 }, (v, i) => i + 1).map(
                                (el) => (
                                  <option key={el} value={el}>
                                    {el}
                                  </option>
                                )
                              )}
                            </Form.Select>
                          </FloatingLabel>

                          <FloatingLabel
                            className="mb-3"
                            label="Votre commentaire"
                          >
                            <Form.Control
                              as="textarea"
                              placeholder="Votre commentaire"
                              style={{ height: "100px" }}
                              {...register(`comment${item.product.id}`)}
                            />
                          </FloatingLabel>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>

                    <Button
                      type="submit"
                      className="pe-5 ps-5 d-flex mb-5 mx-auto"
                      disabled={isSubmitting}
                    >
                      Envoyer
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
