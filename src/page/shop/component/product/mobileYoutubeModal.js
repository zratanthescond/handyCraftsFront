import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import useSWR from "swr";

export default function MobileYoutubeModal() {
  const { data: siteInfo } = useSWR("/site_infos/1");

  const [show, setShow] = useState(false);

  const handleModalClose = () => setShow(false);

  const YbModal = () => (
    <Modal show={show} onHide={handleModalClose} size="lg" centered>
      <Modal.Header closeButton>
        <h5 className="fw-bold fs-16 mb-0">Comment acheter sur Paramall</h5>
      </Modal.Header>

      <Modal.Body>
        <iframe
          src={`https://www.youtube.com/embed/${siteInfo.mobileYoutubeVideo}`}
          title="Commande sur Paramall"
          height={300}
          width="100%"
        />
      </Modal.Body>
    </Modal>
  );

  if (!siteInfo) return null;

  return (
    <>
      <div className="mb-3 mt-3 d-flex flex-column justify-content-center me-4 ms-4">
        <Button variant="outline-primary" onClick={() => setShow(true)}>
          <FontAwesomeIcon icon={faYoutube} />
          <span className="ms-1">Comment commander</span>
        </Button>
      </div>
      <YbModal />
    </>
  );
}
