import { Col, Row } from "react-bootstrap";
import styles from "./style/reassurance.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCreditCard,
  faShippingFast,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function Reassurance() {
  const items = [
    {
      title: "Conseils par un expert",
      desc: "Profiez des bons plans",
      icon: faUserCheck,
    },

    {
      title: "Produits authentiques",
      desc: "100% des produits contrôlés",
      icon: faCheck,
    },

    {
      title: "Livraison gratuite",
      desc: "Sur tous achats supérieurs à 99 DT",
      icon: faShippingFast,
    },
    {
      title: "Paiement",
      desc: "Paiement sécurisé par carte bancaire",
      icon: faCreditCard,
    },
  ];

  return (
    <Row className="mb-4 align-items-stretch">
      {items.map((item, index) => (
        <Col md={3} xs={6} className="mb-2 mb-md-0" key={index}>
          <div className={`${styles.block} d-flex flex-column h-100`}>
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
              <div className="me-2"><FontAwesomeIcon icon={item.icon} color="#03cecb" /></div>
              <h4 className="fs-14 fs-md-17 mb-1 mb-md-0">{item.title}</h4>
            </div>

            <p className="fs-md-14 fs-12 mb-0">{item.desc}</p>
          </div>
        </Col>
      ))}
    </Row>
  );
}
