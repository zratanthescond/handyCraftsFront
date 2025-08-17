import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import authActions from "../../../store/auth/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faList,
  faMapMarked,
  faPercent,
  faUser,
  faUserClock,
  faUserTimes,
} from "@fortawesome/free-solid-svg-icons";

export default function DashboardLayout({ children }) {
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.auth);

  const loggout = (e) => {
    toast.info(`Aurevoir ${userData.firstName}`, { autoClose: 2000 });

    e.preventDefault();

    dispatch(authActions.logout());
  };

  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col md={4} className="pe-md-4 mb-4 mb-md-0">
          <ListGroup className="fw-medium">
            <LinkContainer to="/dashboard" exact>
              <ListGroup.Item action>
                <FontAwesomeIcon icon={faUser} />
                <span className="ms-2">Mes informations personnelles</span>
              </ListGroup.Item>
            </LinkContainer>
            <LinkContainer to="/dashboard/orders" exact>
              <ListGroup.Item action>
                <FontAwesomeIcon icon={faList} />
                <span className="ms-2">Mes commandes</span>
              </ListGroup.Item>
            </LinkContainer>
            <LinkContainer to="/dashboard/wishlist" exact>
            <ListGroup.Item action>
              <FontAwesomeIcon icon={faHeart} />
              <span className="ms-2">Wishlist</span>
            </ListGroup.Item>
            </LinkContainer>
            {/* 

            <ListGroup.Item>
              <FontAwesomeIcon icon={faMapMarked} />
              <span className="ms-2">Mes adresses</span>
            </ListGroup.Item>
            
            */}

            <LinkContainer to="/dashboard/rewardspoints" exact>
              <ListGroup.Item action>
                <FontAwesomeIcon icon={faPercent} />
                <span className="ms-2">Mes points de fidélité</span>
              </ListGroup.Item>
            </LinkContainer>


            <LinkContainer to="/dashboard/parrainage/new" exact>
              <ListGroup.Item action>
                <FontAwesomeIcon icon={faUserClock} />
                <span className="ms-2">Parrainage</span>
              </ListGroup.Item>
            </LinkContainer>

            <LinkContainer to="/" exact onClick={loggout}>
              <ListGroup.Item action>
                <FontAwesomeIcon icon={faUserTimes} />
                <span className="ms-2">Se déconnecter</span>
              </ListGroup.Item>
            </LinkContainer>
          </ListGroup>
        </Col>

        <Col md={8}>{children}</Col>
      </Row>
    </Container>
  );
}
