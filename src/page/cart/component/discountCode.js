import { useState } from "react";
import { Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { commonHttp } from "../../../util/http";
import * as dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import cartActions from "../../../store/cart/cartActions";

export default function DiscountCode() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatcher = useDispatch();

  const { discountCode } = useSelector((state) => state.cart);

  const onSubmit = async (data) => {
    const { code } = data;

    try {
      const req = await commonHttp.get("/discount_codes", {
        params: {
          code: code,
        },
      });

      const res = req.data;

      if (res["hydra:member"].length === 0) {
        setError("code", { type: "invalid code", message: "Code invalide" });
      } else {
        const discount = res["hydra:member"][0];

        const expirationDate = dayjs(discount.expirationDate);

        if (!discount.isValid) {
          setError("code", {
            type: "invalid code",
            message: "Ce code n'est plus valable",
          });
        } else if (!dayjs().isBefore(expirationDate)) {
          setError("code", { type: "invalid code", message: "Code expiré" });
        } else {
          dispatcher(cartActions.addDiscountCode(discount));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!discountCode ? (
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex flex-md-row flex-column justify-content-end mb-3 pb-3 border-bottom"
        >
          <Form.Group>
            <FloatingLabel
              label="Code promo"
              controlId="floatingInput"
              style={{ fontSize: 14 }}
            >
              <Form.Control
                isInvalid={errors.code}
                {...register("code", { required: true })}
                placeholder="Code promo"
              />

              <Form.Control.Feedback type="invalid">
                {errors.code?.type === "invalid code" && errors.code.message}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <div className="ms-3  mt-2 mt-md-0 d-flex align-self-end">
            <Button
              type="submit"
              variant="outline-primary"
              disabled={isSubmitting}
            >
              Appliquer
            </Button>
          </div>
        </Form>
      ) : (
        <div className="d-flex justify-content-end">
          
          <Alert bg="primary" className="fw-normal">
            
           <span>Vous bénéficiez d'une réduction de {discountCode.percentage} % </span>

           {discountCode.promoter && <span>de la part de <span className="fw-bold">{discountCode.promoter.alias ? discountCode.promoter.alias : discountCode.promoter.lastName}</span></span>}

           
          
          </Alert>

        </div>
      )}
    </>
  );
}
