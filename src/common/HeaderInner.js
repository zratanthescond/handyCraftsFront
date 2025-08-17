import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartBtn from "./cart";
import Login from "./loginBtn";
import Search from "./search";

export default function HeaderInner() {
 

  return (
    <section className={`bg-white pt-3 pb-3 border-bottom`}>
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Link to="/">
              <img src="/img/logo.png" className="img-fluid" alt="Paramall" />
            </Link>
          </div>

          <div>
            <Search />
          </div>

          <div>
            <ul className="list-inline d-flex align-items-center mb-0">
              <li className="me-4">
                <CartBtn />
              </li>

              <li>
                <Login />
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
