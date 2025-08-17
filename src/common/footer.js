import { faEnvelope, faHome, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import useSiteInfo from "../hook/siteInfo";
import styles from "./style/footer.module.scss";

export default function Footer() {
  const { phone, address } = useSiteInfo();

  const y = new Date().getFullYear();

  return (
    <>
      <footer className={`${styles.footerWrapper}`}>
        <Container>
          <Row className="align-items-md-center">
            <Col
              md={4}
              className={`${styles.firstCol} mb-3 mb-md-0 d-none d-md-flex`}
            >
              <div>
                <img
                  src="/img/logo-footer.png"
                  className="img-fluid"
                  alt="Paramall"
                />
              </div>

              <p className="fs-16 mt-2 pe-md-3 ps-md-3 d-none d-md-block">
                Parapharmacie en ligne pour acheter des produits
                parapharmaceutiques de qualité, de beauté et bien être destinés
                pour hommes et femmes.
              </p>
            </Col>

            <Col md={8}>
              <Row>
                <Col md={4} xs={6} className="ps-lg-4">
                  <h4 className="fs-15 fs-md-18 mb-2">Informations</h4>

                  <ul className={styles.nav}>
                    <li>
                      <Link to="/content/1">A propos</Link>
                    </li>

                    <li>
                      <Link to="/shop">Boutique</Link>
                    </li>

                    <li>
                      <Link to="/promo">Promotions</Link>
                    </li>

                    <li>
                      <Link to="/shop/brands">Marques</Link>
                    </li>

                    <li>
                      <Link to="/blog">Blog</Link>
                    </li>

                    <li>
                      <Link to="/contact">Contactez-nous</Link>
                    </li>
                  </ul>
                </Col>

                <Col md={4} xs={6}>
                  <h4 className="fs-15 fs-md-18 mb-2">Mon compte</h4>

                  <ul className={styles.nav}>
                    <li>
                      <Link to="/dashboard">Mes informations personnelles</Link>
                    </li>

                    <li>
                      <Link to="/dashboard/orders">Mes commandes</Link>
                    </li>

                    <li>
                      <Link to="/dashboard/rewardspoints">
                        Mes points de fidélité
                      </Link>
                    </li>

                    <li>
                      <Link to="/dashboard/parrainage/new">Parrainage</Link>
                    </li>

                    <li>
                      <Link to="/dashboard/wishlist">Wishlist</Link>
                    </li>
                  </ul>
                </Col>

                <Col md={4} className="d-none d-md-block">
                  <h4 className="fs-15 fs-md-18 mb-2">Contact</h4>

                  <ul className={`list-inline ${styles.info}`}>
                    <li>
                      <FontAwesomeIcon icon={faHome} />
                      <span>{address}</span>
                    </li>

                    <li>
                      <FontAwesomeIcon icon={faPhone} />
                      <span>{phone}</span>
                    </li>

                    <li>
                      <FontAwesomeIcon icon={faEnvelope} />
                      <span>contact@paramall.tn</span>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </footer>

      <div
        className="after_footer d-lg-block pt-3 pb-3 text-white fs-14 fw-light"
        style={{
          background: "#22282e",
          borderTop: "1px solid rgba(238, 238, 238, 0.3)",
        }}
      >
        <Container>
          <Row>
            <Col md={12} className="d-md-flex justify-content-md-between">
              <div>
                <ul className="list-inline d-flex justify-content-center mb-0 fs-md-15 fs-13">
                  <li className="me-2">Paramall ©{y} </li>

                  <li className="me-2">|</li>

                  <li className="me-2">
                    <Link to={`/content/2`} className="text-white">
                      CGV{" "}
                    </Link>
                  </li>

                  <li className="me-2">|</li>

                  <li>
                    <Link to={`/content/3`} className="text-white">
                      Mentions légales
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="d-none d-md-block">
                <p className="mb-0">
                  Design &#38; développement par{" "}
                  <a href="https://www.dealink.tn/" target="_blank" rel="noreferrer">
                    Dealink
                  </a>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
