import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import { Alert, Card, FloatingLabel, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import useSWR from "swr";
import useRewardPoints from "../../../hook/useRewardPoints";
import cartActions from "../../../store/cart/cartActions";
import { priceFormater } from "../../../util/priceHelper";

export default function OrderRewardsPoint() {
  const { id } = useSelector((state) => state.auth.userData);

  const { subtotal } = useSelector((state) => state.cart);

  const dispatcher = useDispatch();

  const { data: user, error } = useSWR(`/users/${id}`);

  const [rewardPointsToConsume, setRewardPointsToConsume] = useState(0);

  const { discount } = useRewardPoints(rewardPointsToConsume);

  // return discount value based on user points

  const { discount: userDiscountValue } = useRewardPoints(
    user ? user.rewardPoints : 0
  );
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return { points: rewardPointsToConsume };
    }, [rewardPointsToConsume]),
  });

  // check if the discount value is grater than the order subtotal

  const livePoints = watch("points");

  const { discount: discountToConsume } = useRewardPoints(livePoints);

  useEffect(() => {
    if (user) {
      //setRewardPointsToConsume(user.rewardPoints);
      //reset({ points: user.rewardPoints });
    }
  }, [user]);

  const onSubmit = (data) => {
    const points = parseInt(data.points);

    if (points > user.rewardPoints) {
      setError("points", {
        type: "invalid",
        message: `Vous avez seulement ${user.rewardPoints} points de fidélité`,
      });
    } else if (discountToConsume > subtotal) {
      setError("points", {
        type: "invalid",
        message: `La valeur de réduction est supérieure à la valeur de la commande !`,
      });
    } else {
      setRewardPointsToConsume(points);
    }
  };

  useEffect(() => {
    if (rewardPointsToConsume > 0) {
      dispatcher(cartActions.addRewardsPoints(rewardPointsToConsume, discount));
    }
  }, [rewardPointsToConsume]);

  if (!user || error) return null;

  if (user.rewardPoints == 0) return null;

  return (
    <Card className="mb-3">
      <Card.Header>
        <span className="fw-bold fs-5">4. Réduction</span>
      </Card.Header>

      <Card.Body>
        <Alert variant="info" className="text-center">
          <FontAwesomeIcon icon={faCheck} />
          <span className="ms-1">
            {rewardPointsToConsume > 0 ? (
              <>
                Vous bénéficiez
                <span className="ms-1">
                  <span className="fw-medium">
                    de {priceFormater(discount)}
                  </span>{" "}
                  de réduction
                </span>
              </>
            ) : (
              <span>
                {" "}
                Vous avez {user.rewardPoints} points de fidélité vous offrant
                jusqu'au {priceFormater(userDiscountValue)}
              </span>
            )}
          </span>
        </Alert>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FloatingLabel label="Nombre de points à consommer" className="mb-3">
            <Form.Control
              type="number"
              placeholder="Nombre de points à consommer"
              isInvalid={!!errors.points}
              {...register("points", { required: true, min: 1 })}
            />

            {errors.points ? (
              <Form.Control.Feedback type="invalid">
                {errors.points.message}
              </Form.Control.Feedback>
            ) : (
              <Form.Text>
                Vous avez {user.rewardPoints} points de fidélité
              </Form.Text>
            )}
          </FloatingLabel>
          <Button type="submit" className="pe-4 ps-4" variant="outline-primary" size="sm">
            Valider
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
