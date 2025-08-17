import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

export default function Paginator({ data, pageNumber, setPageNumber }) {
  
  const [lastPage, setLastPage] = useState(null);

  const handleNextPage = () => setPageNumber(pageNumber + 1);

  const handlePrevPage = () => setPageNumber(pageNumber - 1);

  const lastPageParam = new URLSearchParams(
    data && data["hydra:view"] ? data["hydra:view"]["hydra:last"] : "_page=1"
  );

  const lastPageInit = lastPageParam.get("_page");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNumber]);

  useEffect(() => {
    if (lastPageInit) {
      setLastPage(lastPageInit);
    }
  }, [lastPageInit]);

  return (
    <Pagination className="justify-content-center mt-2 fw-medium">
      <Pagination.Prev onClick={handlePrevPage} disabled={pageNumber === 1}>
        <FontAwesomeIcon icon={faChevronLeft} />

        <span className="ms-2">Précédent</span>
      </Pagination.Prev>

      <Pagination.Next
        onClick={handleNextPage}
        disabled={lastPage <= pageNumber}
      >
        <span className="me-2">Suivant</span>

        <FontAwesomeIcon icon={faChevronRight} />
      </Pagination.Next>
    </Pagination>
  );
}
