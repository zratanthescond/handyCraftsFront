import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Offcanvas,
  Accordion,
  ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import useSWR from "swr";
import CartBtn from "./cart";
import Login from "./loginBtn";
import MobileSearch from "./mobile/mobileSearch";

export default function HeaderInnerMobile() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const [showSearch, setShowSearch] = useState(false);

  const closeShowSearch = () => setShowSearch(false);

  const { data: navItems, error } = useSWR("/product_categories/navigation");

  if (!navItems || error) return null;
  function slugify(text) {
    return text
      .toString()                           // Cast to string (optional)
      .normalize('NFKD')            // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
      .toLowerCase()                  // Convert the string to lowercase letters
      .trim()                                  // Remove whitespace from both sides of a string (optional)
      .replace(/\s+/g, '-')            // Replace spaces with -
      .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
      .replace(/\-\-+/g, '-');        // Replace multiple - with single -
  }
  return (
    <>
      <section className="bg-white pt-3 pb-3 border-bottom fixed-top">
        <Container fluid>
          <Row className="align-items-center">
            <Col xs={4}>
              <div className="d-flex align-items-center">
                <div className="me-2">
                  <Button
                    variant="link"
                    className="shadow-none p-0"
                    onClick={handleShow}
                  >
                    <FontAwesomeIcon icon={faBars} size="lg" />
                  </Button>
                </div>
                <div>
                  <Button
                    variant="link"
                    className="shadow-none"
                    onClick={() => setShowSearch(true)}
                  >
                    <FontAwesomeIcon icon={faSearch} size="lg" />
                  </Button>
                </div>
              </div>
            </Col>

            <Col xs={4}>
              <Link to="/">
                <img
                  src="/img/logo.png"
                  className="img-fluid"
                  alt="Paramall"
                  style={{ maxHeight: 60 }}
                />
              </Link>
            </Col>

            <Col xs={4}>
              <div className="d-flex align-items-center justify-content-end">
                <div className="me-2">
                  <CartBtn />
                </div>

                <Login />
              </div>
            </Col>
          </Row>
        </Container>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <div className="d-flex flex-row">
              <div className="me-3">
                <Link to="/shop/type/coffrets" onClick={handleClose}>
                  <img
                    src="/img/coffret.png"
                    className="img-fluid"
                    alt="coffret"
                  />
                </Link>
              </div>

              <div>
                <Link to="/promo" onClick={handleClose}>
                  <img
                    src="/img/promo-nav.png"
                    className="img-fluid"
                    alt="coffret"
                  />
                </Link>
              </div>
            </div>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Accordion>
              {navItems["hydra:member"].map((el) => (
                <Accordion.Item eventKey={el.item.id} key={el.item.id}>
                  <Accordion.Header><span className="fw-medium">{el.item.title}</span></Accordion.Header>
                  <Accordion.Body>
                    <ListGroup variant="flush">
                      {el.items &&
                        el.items.map((item) => (
                          <ListGroup.Item key={item.id}>
                            {!item.subItems.length ? (
                              <Link
                                className="text-dark fs-15 fw-medium"
                                to={`/shop/category/${slugify(item.title)}-${item.id}`}
                                onClick={handleClose}
                              >
                                {item.title}
                              </Link>
                            ) : (
                              <>
                                <span className="text-dark fs-15 fw-medium">{item.title}</span>

                                <ListGroup variant="flush">
                                  {item.subItems.map((subItem) => (
                                    <ListGroup.Item key={subItem.id}>
                                      <Link
                                        to={`/shop/category/${slugify(item.title)}-${subItem.id}`}
                                        className="fs-14 text-dark"
                                        onClick={handleClose}
                                      >
                                        {subItem.title}
                                      </Link>
                                    </ListGroup.Item>
                                  ))}
                                </ListGroup>
                              </>
                            )}
                          </ListGroup.Item>
                        ))}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Offcanvas.Body>
        </Offcanvas>
      </section>

      <MobileSearch showSearch={showSearch} closeShowSearch={closeShowSearch} />
    </>
  );
}
