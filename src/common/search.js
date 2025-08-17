import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Form, InputGroup, Button, Dropdown } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { apiStorage } from "../config/api/api";
import { commonHttp } from "../util/http";
import styles from "./style/search.module.scss";

export default function Search() {
    const {
        handleSubmit,
        register,
        watch,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm();

    const q = watch("q");

    const [show, setShow] = useState(false);

    const [result, setResult] = useState([]);
    const history = useHistory();

    const handleClose = () => {
        setTimeout(() => {
            setShow(false);
            reset();
        }, 200);
    };

    const fetch = async (_) => {
        try {
            const req = await commonHttp.get(
                `products?title=${q}&itemsPerPage=10`
            );

            const data = req.data;

            const products = data["hydra:member"];

            if (products.length > 0) {
                setResult(products);

                if (history.location.pathname === "/search/" + q) {
                    setShow(false);
                    // reset();
                } else {
                    setShow(true);
                }
            } else {
                setShow(false);

                setError("q", { type: "not found" });

                setResult([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const WAIT_INTERVAL = 500;

        const delay = setTimeout(async () => {
            if (q && q.length >= 3) {
                fetch();
            }
        }, WAIT_INTERVAL);

        return () => {
            clearTimeout(delay);
        };
    }, [q]);

    const onSubmit = async (data) => {
        fetch();
    };

    const onKeyUp = (event) => {
        if (event.charCode === 13) {
            setShow(false);
            history.push(`/search/${q}`);
        }
    };

    const showAll = () => {
        setShow(false);
        history.push(`/search/${q}`);
    };

    return (
        <Form className="d-flex" onSubmit={handleSubmit(onSubmit)}>
            <Dropdown show={show} onBlur={handleClose}>
                <Form.Control
                    type="text"
                    aria-label="Search"
                    className={styles.input}
                    placeholder="Rechercher un produit...."
                    onKeyPress={onKeyUp}
                    isInvalid={errors.q}
                    autoComplete="off"
                    {...register("q", { required: true, minLength: 3 })}
                />

                <Form.Control.Feedback
                    type="invalid"
                    style={{ position: "absolute" }}
                >
                    {errors.q && errors.q.type === "required" && (
                        <span>Veuillez saisir un nom de produit</span>
                    )}

                    {errors.q && errors.q.type === "minLength" && (
                        <span>Veuillez saisir au moins 4 caractères</span>
                    )}

                    {errors.q && errors.q.type === "not found" && (
                        <span>Aucun produit trouvé !</span>
                    )}
                </Form.Control.Feedback>

                <Dropdown.Menu
                    className={styles.dropdown}
                    style={{
                        maxHeight: 400,
                        overflow: "scroll",
                        overflowX: "hidden",
                    }}
                >
                    {result.length > 0 &&
                        result.map((product) => (
                            <Dropdown.Item
                                key={product.id}
                                as={Link}
                                to={`/shop/product/${
                                    product.id
                                }/${product.slug.toLowerCase()}`}
                                eventKey={product.id}
                            >
                                <div className="d-flex flex-md-row align-items-center">
                                    <img
                                        src={`${apiStorage}/${product.thumbnail}`}
                                        className="img-fluid me-2"
                                        alt={product.title}
                                        style={{ maxHeight: 50 }}
                                    />
                                    <span className="text-dark fs-13 fs-md-14">
                                        {product.title.substr(0, 35)}...
                                    </span>
                                </div>
                            </Dropdown.Item>
                        ))}
                    {result.length >= 8 && (
                        <Dropdown.Item as={Link} to={`/search/${q}`}>
                            <span className="text-dark fs-13 fs-md-14 text-uppercase bg-primary text-white pt-2 pb-2 pe-4 ps-4 d-table mx-auto">
                                Voir tous les produits
                            </span>
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>

            <InputGroup>
                <Button
                    className={styles.btn}
                    type="submit"
                    onClick={showAll}
                    disabled={isSubmitting}
                >
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </InputGroup>
        </Form>
    );
}
