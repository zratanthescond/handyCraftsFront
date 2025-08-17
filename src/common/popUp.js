import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { apiStorage } from "../config/api/api";

export default function PopUp() {
  const [displayed, setIsDisplayed] = useState(
    sessionStorage.getItem("popup") || false
  );

  const [show, setShow] = useState(false);

  const handleClose = () => {
    sessionStorage.setItem("popUp", true);

    setIsDisplayed(true);

    setShow(false);
  };

  const { data: popup } = useSWR("/pop_ups/1");

  const delay = 10000;

  useEffect(() => {
    if (popup && popup.isActive && !displayed) {
      const timer = setTimeout(() => {
        setShow(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [popup]);

  if (!popup) return null;

  return (
    <Modal show={show} onHide={handleClose} className="border-0" centered>
      <Modal.Body className="p-0">
        <Link to={popup.link} onClick={handleClose}>
          <img
            src={`${apiStorage}/${popup.image}`}
            className="img-fluid"
            alt=""
          />
        </Link>
      </Modal.Body>
    </Modal>
  );
}
