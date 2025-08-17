import { Card, Col, Row, Spinner, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import useSWR from "swr";
import { apiStorage } from "../../../config/api/api";
import styles from "../style/blog.module.scss";

export default function RelatedArticles({current}) {

    const url = `/blogs?itemsPerPage=4`;

    const { data, error } = useSWR(url);

    const articles = data ? data["hydra:member"].filter(a => a.id !== current.id) : [];
    
    if (!data) return <Spinner animation="border" variant="primary" />;

    if (error) return <div>Une erreur est survenue</div>;

    return (

        <Row>

        <Col md={12}><h2 className="fs-4 fw-bold mb-3">A lire aussi</h2></Col>
         
         {articles.map((blog) => (
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

                <LinkContainer to={`/blog/${blog.id}`}>
                  <Button size="sm">Lire la suite</Button>
                </LinkContainer>
              </Card.Body>
            </Card>
          </Col>
        ))}

        </Row>
    )
}