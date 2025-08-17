import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { Menu, MenuItem, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { Fragment } from "react";

export default function PrimaryNav() {
    const { data: navItems, error } = useSWR("/product_categories/navigation");

    const maxElements = 10;

    if (!navItems || error) return null;
    function slugify(text) {
        return text
          .toString()                           // Cast to string (optional)
          .normalize('NFKD')            // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
          .toLowerCase()                  // Convert the string to lowercase letters
          .trim()                                  // Remove whitespace from both sides of a string (optional)
          .replace(/\s+/g, '-')            // Replace spaces with -
          .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
          .replace(/\-\-+/g, '-');        // Replace multiple - with single -
      }
    return (
        <Navbar
            bg="white"
            expand="lg"
            id="primary_nav"
            className={`mb-3 border-bottom d-none d-md-block`}
        >
            <Container>
                <Nav className={`me-auto my-2 my-lg-0`}>
                    {navItems["hydra:member"]
                        .slice(0, maxElements)
                        .map((el) => (
                            <Fragment key={el.id}>
                                <Nav.Item className="me-3">
                                    <Menu
                                        menuButton={
                                            <button className="btn btn-link text-dark shadow-none p-0">
                                                {el.item.title}
                                               
                                            </button>
                                        }
                                    >
                                        {el.items ? (
                                            el.items.map((item) => (
                                                <Fragment key={item.id}>
                                                    {!item.subItems.length ? (
                                                        <MenuItem
                                                            key={item.id}
                                                            className="pb-1 pt-1"
                                                        >
                                                            <Link
                                                                to={`/shop/category/${slugify(item.title)}-${item.id}`}
                                                                className="fs-14 text-dark"
                                                            >
                                                                {item.title}
                                                            </Link>
                                                        </MenuItem>
                                                    ) : (
                                                        <SubMenu
                                                            label={item.title}
                                                            className="fs-14 text-dark"
                                                        >
                                                            {item.subItems.map(
                                                                (subItem) => (
                                                                    <MenuItem
                                                                        key={
                                                                            subItem.key
                                                                        }
                                                                    >
                                                                        <Link
                                                                            to={`/shop/category/${slugify(subItem.title)}-${subItem.id}`}
                                                                            className="fs-14 text-dark"
                                                                        >
                                                                            {
                                                                                subItem.title
                                                                            }
                                                                        </Link>
                                                                    </MenuItem>
                                                                )
                                                            )}
                                                        </SubMenu>
                                                    )}
                                                </Fragment>
                                            ))
                                        ) : (
                                            <MenuItem
                                                key={el.id}
                                                className="fs-14 text-dark"
                                            >
                                                {" "}
                                                <Link
                                                    to={`/shop/category/${slugify(el.title)}-${el.id}`}
                                                    className="fs-14 text-dark"
                                                >
                                                    {el.title}
                                                </Link>
                                            </MenuItem>
                                        )}
                                    </Menu>
                                </Nav.Item>
                            </Fragment>
                        ))}
                </Nav>

                <div className="d-flex flex-row">
                    <div className="me-3">
                        <Link to="/shop/type/coffrets">
                            <img
                                src="/img/coffret.png"
                                className="img-fluid"
                                alt="coffret"
                            />
                        </Link>
                    </div>

                    <div>
                        <Link to="/promo">
                            <img
                                src="/img/promo-nav.png"
                                className="img-fluid"
                                alt="coffret"
                            />
                        </Link>
                    </div>
                </div>
            </Container>
        </Navbar>
    );
}
