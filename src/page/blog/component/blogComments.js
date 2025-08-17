import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FloatingLabel,
  Form,
  Button,
  Spinner,
  ListGroup,
  Card,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";
import DateFormat from "../../../common/util/dateFormat";
import authActions from "../../../store/auth/authActions";
import { commonHttp } from "../../../util/http";

export default function BlogComments({ blog }) {
  const {
    userData: { id: userId, firstName, lastName },
    isLogged,
  } = useSelector((state) => state.auth);

  const dispatcher = useDispatch();

  const openAuthModal = () => dispatcher(authActions.showModal());

  const url = `blog_comments?blog.id=${blog.id}&isValidated=true`;

  const { data: comments, error } = useSWR(url);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      commonHttp.post("/blog_comments", {
        blog: `/api/blogs/${blog.id}`,
        comment: data.comment,
        user: `/api/users/${userId}`,
      });

      const prevComments = comments["hydra:member"];

      comments["hydra:member"] = [
        ...prevComments,
        {
          comment: data.comment,
          id: Math.random(),
          user: { firstName },
          createdAt: new Date(),
        },
      ];

      mutate(url, { ...comments }, false);

      reset();

      toast.success("Votre commentaire a été envoyé");
    } catch (error) {
      console.log(error);
    }
  };

  if (!comments || error) return null;

  return (
    <Card className="mb-5">
      <Card.Body>
        <h2 className="fs-4 fw-bold mb-3">
          <FontAwesomeIcon icon={faComment} />
          <span className="ms-2">
            {comments["hydra:member"].length == 0 ? (
              "Aucun commentaire"
            ) : (
              <span>{comments["hydra:member"].length} commentaire(s)</span>
            )}
          </span>
        </h2>

        <ListGroup variant="flush" className="mb-3">
          {comments["hydra:member"].map((item) => (
            <ListGroup.Item key={item.id}>
              <div className="media">
                <div className="media-body">
                  <div className="d-flex align-items-center">
                    <h5 className="mt-0 mb-0">{`${item.user.firstName
                      .charAt(0)
                      .toUpperCase()}${item.user.firstName.slice(1)}`}</h5>
                    <span className="ms-2 text-muted small">
                      <DateFormat date={item.createdAt} format="D/MM/YYYY" />
                    </span>
                  </div>
                  <p className="mb-0">{item.comment}</p>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {isLogged ? (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FloatingLabel label="Ajouter un commentaire" className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Ajouter un commentaire"
                style={{ height: "100px" }}
                {...register("comment", { required: true })}
                isInvalid={errors.comment}
              />
            </FloatingLabel>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="d-table mx-auto"
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
              <span>Envoyer</span>
            </Button>
          </Form>
        ) : (
          
          <Button variant="link" onClick={openAuthModal}>Se connecter pour laisser un commentaire</Button>
        )}
      </Card.Body>
    </Card>
  );
}
