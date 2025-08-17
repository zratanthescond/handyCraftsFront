import clsx from 'clsx';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import {
    faWindowClose
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import './home.css'


export default function WheelOfFortuneHome() {
    const [isVisible, setIsVisible] = useState(false)
    const toggleOverlay = () => setIsVisible(!isVisible);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = (data) => console.log('onSubmit', data)

    const handleClose = () => {
        reset();
        toggleOverlay()
    };

    return (
        <>
            <Helmet>
                <title>Paramall : Roue de la Chance</title>
            </Helmet>
            <Container className="mt-3 mt-md-0">
                <div className="wrapper">
                    <div className="logo">
                        <Link to="/">
                            <img
                                src="/img/logo.png"
                                className="img-fluid"
                                alt="Paramall"
                            />
                        </Link>
                    </div>
                    <div className="header">دور العجلة وإربح</div>
                    <button onClick={toggleOverlay}>شارك الأن</button>
                    <div className="wheel">
                        <img src="/img/groupe-2.png" alt="wheel"/>
                    </div>
                    <div className={clsx( 'overlay', {isVisible}) }>
                        <div className="close-overlay" onClick={handleClose}>
                            <FontAwesomeIcon icon={faWindowClose}/>
                        </div>
                        <div className="register-form">
                            <Form
                                onSubmit={handleSubmit(onSubmit)}
                                className="d-flex flex-column mb-3"
                            >
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        dir="rtl"
                                        placeholder="الإسم واللقب"
                                        type="text"
                                        {...register("name", { required: true })}
                                        isInvalid={errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name?.type === "name" &&
                                            errors.name.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        dir="rtl"
                                        placeholder="رقم الهاتف"
                                        type="number"
                                        {...register("phone", { required: true })}
                                        isInvalid={errors.phone}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.phone?.type === "phone" &&
                                            errors.phone.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        dir="rtl"
                                        placeholder="البريد الإلكتروني"
                                        type="email"
                                        {...register("email", { required: true })}
                                        isInvalid={errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email?.type === "email" &&
                                            errors.email.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        label="تم مراجعة شروط وأحكام اللعبة"
                                        {...register("condition", { required: true })}
                                        isInvalid={errors.condition}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.condition?.type === "condition" &&
                                            errors.condition.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button
                                    variant="outline-primary"
                                    type="submit"
                                    disabled={isSubmitting}
                                >مشاركة</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
