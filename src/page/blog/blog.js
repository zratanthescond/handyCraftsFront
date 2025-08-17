import {
  Breadcrumb,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import { useParams } from "react-router";
import useSWR from "swr";
import { apiStorage } from "../../config/api/api";
import HtmlParser from "../../common/htmlPaser";
import DateFormat from "../../common/util/dateFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faFolder } from "@fortawesome/free-solid-svg-icons";
import styles from "./style/blog.module.scss";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { baseUrl } from "../../config/front/url";
import { LinkContainer } from "react-router-bootstrap";
import { Helmet } from "react-helmet-async";
import RelatedArticles from "./component/relatedArticles";
import BlogComments from "./component/blogComments";
import useDeviseDetect from "../../util/deviseDetect";

export default function Blogs() {
  const { id } = useParams();

  const url = `/blogs/${id}`;

  const { data: blog, error } = useSWR(url);

  const { isPhone } = useDeviseDetect();

  const socialShares = [
    {
      title: "Partager sur Facebook",
      mobileTitle: "Partager",
      bg: "#3b5998",
      Icon: () => <FontAwesomeIcon icon={faFacebook} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${baseUrl}/blog/${id}`,
    },

    {
      title: "Partager sur Twitter",
      mobileTitle: "Twitter",
      bg: "#00aced",
      Icon: () => <FontAwesomeIcon icon={faTwitter} />,
      url: `https://twitter.com/intent/tweet?text=${baseUrl}/blog/${id}`,
    },
  ];

  if (!blog) return <Spinner animation="border" variant="primary" />;

  if (error) return <div>Une erreur est survenue</div>;

  return (
    <>
      <Helmet>
        <title>{blog.title} - Paramall</title>
      </Helmet>

      <Container className="mb-5 mt-3">
        <Row>
          <Col md={10} className="offset-md-1">
            <Breadcrumb className="pt-3">
              <LinkContainer to="/">
                <Breadcrumb.Item>Paramall</Breadcrumb.Item>
              </LinkContainer>

              <LinkContainer to={`/blog`}>
                <Breadcrumb.Item>Conseils et actualiés</Breadcrumb.Item>
              </LinkContainer>

              <Breadcrumb.Item active>{blog.title}</Breadcrumb.Item>
            </Breadcrumb>

            <Card>
              <Card.Img
                variant="top"
                src={`${apiStorage}/${blog.image}`}
                alt={blog.title}
                style={{ maxHeight: 400, objectFit: "cover" }}
              />

              <Card.Body>
                <div className="mb-3 mt-3 border-bottom pb-3">
                  <h1 className="fs-4 fw-bold mb-2">{blog.title}</h1>

                  <div className="d-flex flex-row">
                    <span className="text-muted small me-3">
                      <FontAwesomeIcon icon={faFolder} className="me-2" />

                      <span>{blog.category.title}</span>
                    </span>

                    <span className="text-muted small">
                      <FontAwesomeIcon icon={faCalendar} />

                      <DateFormat
                        date={blog.createdAt}
                        format="DD-MM-YYYY"
                        className="ms-2"
                      />
                    </span>
                  </div>
                </div>

                <div className="content">
                  <HtmlParser html={blog.content} />
                </div>

                <div className="share">
                  <ul className={styles.share}>
                    {socialShares.map((social) => (
                      <li key={Math.random()}>
                        <a
                          rel="noreferrer"
                          href={social.url}
                          style={{ background: social.bg }}
                          target="_blank"
                        >
                          <span>{social.Icon()}</span>
                          <span className="ms-1">
                            {isPhone ? social.mobileTitle : social.title}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={10} className="offset-md-1 mt-4">
            <BlogComments blog={blog} />

            <RelatedArticles current={blog} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
