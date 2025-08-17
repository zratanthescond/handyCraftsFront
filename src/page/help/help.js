import { Col, Container, Row, Accordion, Card, Button } from "react-bootstrap";
import useSWR from "swr";
import FullListLoader from "../../common/loader/ListLoader";
import HtmlParser from "../../common/htmlPaser";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";

export default function Help() {
  const { data: helps, error } = useSWR("/helps");

  if (!helps) return <FullListLoader colNumber={5} />;

  if (error) return <span>Une erreur est survenue !</span>;

  return (
    <>
      <Helmet>
        <title>Foires aux questions</title>
      </Helmet>

      <Container className="mt-3 mb-5">
        <Row>
          <Col md={12}>
            <Card>
              <Card.Body>
                <Row>
                  <Col md={8} className="offset-md-2 text-center mt-3 mb-2">
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      size="3x"
                      className="text-primary"
                    />

                    <h1 className="mt-2 mb-2 fw-bold fs-3 text-primary">
                      Nous sommes là pour vous !
                    </h1>

                    <p>
                      Vous trouvez dans cette rubrique les réponses aux
                      questions les plus fréquentes, si nous trouvez
                      d'informations dont vous avez besoin n'hésitez pas à nous
                      contacter.
                    </p>

                    <LinkContainer to="/contact">
                      <Button>Contactez-nous</Button>
                    </LinkContainer>
                  </Col>
                </Row>

                {helps["hydra:member"].map((help) => (
                  <div key={help.id} className="mb-3 border-bottom pb-3">
                    <h2 className="fs-5 fw-bold mb-3">{help.title}</h2>
                    {help.description && <HtmlParser html={help.description} />}
                    <Accordion defaultActiveKey={help.sections[0].id}>
                      {help.sections.map((section) => (
                        <Accordion.Item eventKey={section.id} key={section.id}>
                          <Accordion.Header>{section.title}</Accordion.Header>
                          <Accordion.Body>
                            <HtmlParser html={section.content} />
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
