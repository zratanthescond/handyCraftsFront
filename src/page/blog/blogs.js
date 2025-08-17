import useSWR from "swr";
import {
  Container,
  Row,
  Spinner,
  Col,
  Card,
  Button,
  Pagination,
} from "react-bootstrap";
import { apiStorage } from "../../config/api/api";
import styles from "./style/blog.module.scss";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

export default function Blogs() {
  const [pageNumber, setPageNumber] = useState(1);

  const [lastPage, setLastPage] = useState(null);

  const handleNextPage = () => setPageNumber(pageNumber + 1);

  const handlePrevPage = () => setPageNumber(pageNumber - 1);

  const url = `/blogs?itemsPerPage=9&_page=${pageNumber}`;

  const { data, error } = useSWR(url);

  const blogs = data ? data["hydra:member"] : [];

  const lastPageParam = new URLSearchParams(
    data ? data["hydra:view"]["hydra:last"] : 0
  );

  const lastPageInit = lastPageParam.get("_page");

  useEffect(() => {
    if (lastPageInit) {
      setLastPage(lastPageInit);
    }
  }, [lastPageInit]);

  if (!data) return <Spinner animation="border" variant="primary" />;

  if (error) return <div>Une erreur est survenue</div>;

  return (
    <Container className="mb-5 mt-4">
      <Helmet>
        <title>Blog - Paramall</title>
      </Helmet>

      <Row>
        <Col md={12} className="mb-3">
          <h1 className="fs-2 fw-bold">Conseils et actualités</h1>
        </Col>

        {blogs.map((blog) => (
          <Col md={4} key={blog.id} className={styles.blogCard}>
            <Card>
              <Card.Img
                variant="top"
                src={`${apiStorage}/${blog.image}`}
                alt={blog.title}
              />

              <Card.Body>
                <h2 className="fs-5 mb-1">{blog.title}</h2>

                <small className="text-muted d-block mb-2">
                  {blog.category.title}
                </small>

                <p>{blog.desc}</p>

                <LinkContainer to={`/blog/${blog.id}`}>
                  <Button size="sm">Lire la suite</Button>
                </LinkContainer>
              </Card.Body>
            </Card>
          </Col>
        ))}

        {lastPage && (
          <Col md={12}>
            <Pagination className="justify-content-center mt-2 fw-medium">
              <Pagination.Prev
                onClick={handlePrevPage}
                disabled={pageNumber === 1}
              />
              <Pagination.Next
                onClick={handleNextPage}
                disabled={lastPage <= pageNumber}
              />
            </Pagination>
          </Col>
        )}
      </Row>
    </Container>
  );
}
