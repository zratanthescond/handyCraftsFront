import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./style/fixedSideBar.module.scss";
import { Button, Modal } from "react-bootstrap";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useSWR from "swr";

export default function FixedSideBar() {

  const {data: siteInfo} = useSWR("/site_infos/1");

  const [isClosed, setIsClosed] = useState(
    sessionStorage.getItem("sidebar") || false
  );

  const [show, setShow] = useState(false);

  const handleModalShow = () => {
    setShow(true);
  };

  const handleModalClose = () => setShow(false);

  const handleClose = () => {
    sessionStorage.setItem("sidebar", false);

    setIsClosed(true);
  };

  const YbModal = () => (
    <Modal show={show} onHide={handleModalClose} size="lg" centered>
      <Modal.Header closeButton>
        <h5 className="fw-bold mb-0">Comment acheter sur Paramall</h5>
      </Modal.Header>

      <Modal.Body>
        <iframe
          src={`https://www.youtube.com/embed/${siteInfo.youtubeVideo}`}
          title="Commande sur Paramall"
          height={400}
          width="100%"
        />
      </Modal.Body>
    </Modal>
  );

  if (isClosed || !siteInfo) return null;

  return (
    <>
      <div className={styles.container}>
        <div>
          <FontAwesomeIcon icon={faYoutube} />

          <span className="ms-1">
            <Button
              onClick={handleModalShow}
              variant="link"
              className="p-0 text-white"
            >
              Comment commander
            </Button>
          </span>
        </div>

        <div>
          <a href={siteInfo.instagram} rel="noreferrer" target="_blank">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>

        <div>
          <a href={siteInfo.facebook} rel="noreferrer" target="_blank">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </div>

        <div>
          <Button
            onClick={handleClose}
            variant="link"
            size="sm"
            className={styles.btnClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
      </div>

      <YbModal />
    </>
  );
}
