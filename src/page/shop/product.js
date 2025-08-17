import {
  Breadcrumb,
  Col,
  Container,
  Row,
  Spinner,
  Card,
  Alert,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router";
import useSWR from "swr";
import { priceFormater } from "../../util/priceHelper";
import AddToCartForm from "./component/addToCartForm";
import NotFound from "../../layout/error/notFound";
import ProductDetails from "./component/product/productDetails";
import ProductPageContext from "../../context/product/ProductPageContext";
import ProductTabs from "./component/product/productTabs";
import RelatedProducts from "./component/product/relatedProducts";
import Reassurance from "../home/component/reassurance";
import useDeviseDetect from "../../util/deviseDetect";
import WishList from "./component/product/wishList";
import { Helmet } from "react-helmet-async";
import { apiStorage } from "../../config/api/api";
import ProductDescription from "./component/product/productDescription";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import MobileYoutubeModal from "./component/product/mobileYoutubeModal";

export default function Product() {
  const { id } = useParams();

  const { data: product, error } = useSWR(`/products/${id}`);

  const contextValues = { product };

  const { isPhone } = useDeviseDetect();

  if (error) return <NotFound />;

  if (!product) return <Spinner animation="border" variant="primary" />;

  return (
    <ProductPageContext.Provider value={contextValues}>
      <Helmet>
        <title>{product.title}</title>
      </Helmet>
      <Container className="mt-3 mb-1 mb-md-5">
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Row>
                  <Col md={6} className="pe-md-5">
                    <img
                      src={`${apiStorage}/${product.thumbnail}`}
                      className="img-fluid d-block mx-auto"
                      alt={product.title}
                    />
                  </Col>

                  <Col md={6}>
                    <Breadcrumb className="pt-4">
                      <LinkContainer to="/">
                        <Breadcrumb.Item>Paramall</Breadcrumb.Item>
                      </LinkContainer>

                      <LinkContainer to="/shop">
                        <Breadcrumb.Item>Boutique</Breadcrumb.Item>
                      </LinkContainer>

                      {product.category && (
                        <LinkContainer
                          to={`/shop/category/${product.category.id}`}
                        >
                          <Breadcrumb.Item>
                            {product.category.title}
                          </Breadcrumb.Item>
                        </LinkContainer>
                      )}
                    </Breadcrumb>

                    <div className="mt-2 mb-4 border-top pt-3">
                      <div className="d-flex justify-content-between">
                        <div className="me-3">
                          <h1 className="fs-4 fw-bold">{product.title}</h1>
                        </div>

                        <div className="mt-1">
                          <WishList product={product} />
                        </div>
                      </div>

                      <div className="mb-3">
                        {product.discount && !product.discount.isExpired ? (
                          <div className="d-flex align-items-center">
                            <span className="text-decoration-line-through text-danger fs-6 me-2">
                              {priceFormater(product.price)}
                            </span>

                            <span className="fw-bold fs-5 text-success">
                              {priceFormater(product.discount.newPrice)}
                            </span>
                          </div>
                        ) : (
                          <span className="fw-bold fs-5 text-success">
                            {priceFormater(product.price)}
                          </span>
                        )}
                      </div>

                      <Alert variant="info" className="fs-15 text-center">
                        En achetant ce produit, vous gagnez
                        <strong className="ms-1">
                          {product.rewardPoints.points} points de fidélité
                        </strong>
                        , convertibles en un bon de
                        <strong className="ms-1">
                          {priceFormater(product.rewardPoints.value)}
                        </strong>
                      </Alert>

                      <div className="mb-3">
                        <ProductDescription />
                      </div>

                      <ProductDetails />
                    </div>

                    <AddToCartForm />

                    {isPhone && (
                      
                      <MobileYoutubeModal />
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col md={12} className="mt-3">
            <ProductTabs />
            {product.category && <RelatedProducts />}
            {isPhone && (
              <div className="mt-5">
                <Reassurance />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </ProductPageContext.Provider>
  );
}
