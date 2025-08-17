import {
  Container,
  Spinner,
  Row,
  Col,
  Breadcrumb,
  Card,
} from "react-bootstrap";
import HtmlParser from "../../common/htmlPaser";
import { useParams } from "react-router";
import useSWR from "swr";
import { Helmet } from "react-helmet-async";

export default function Page() {
  const { id } = useParams();

  const { data: page, error } = useSWR(`/pages/${id}`);

  if (!page) return <Spinner animation="border" variant="primary" />;

  if (error) return <div>Une erreur est survenue</div>;

  return (
    <>
      <Helmet>
        <title>{page.title} - Paramall</title>
      </Helmet>

      <Container className="mb-5 mt-2">
        <Row>
          <Col md={12}>
            <Breadcrumb className="pt-4">
              <Breadcrumb.Item>Paramall</Breadcrumb.Item>

              <Breadcrumb.Item active>{page.title}</Breadcrumb.Item>
            </Breadcrumb>

            <Card>
              <Card.Body>
                <h1 className="fs-4 fw-bold mb-2">{page.title}</h1>

                <div className="content">
                  <HtmlParser html={page.content} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
