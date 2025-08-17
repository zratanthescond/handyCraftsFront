import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, Button, Alert, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import useSWR, { mutate } from "swr";
import { apiStorage } from "../../config/api/api";
import authActions from "../../store/auth/authActions";
import { commonHttp } from "../../util/http";
import DashboardLayout from "./component/dashboardLayout";
import ShareWishlist from "./component/shareWishlist";

export default function UserWishList() {
  const auth = useSelector((state) => state.auth);

  const { id: userId } = auth.userData;

  const url = `/products?users=${userId}`;

  const { data: products, error } = useSWR(url);

  const dispatch = useDispatch();

  const handleClick = async (id) => {
    if (products) {
      const newWishList = products["hydra:member"].filter(
        (product) => product.id !== id
      );

      const IRIs = Array.from(newWishList, (product) => product["@id"]);

      dispatch(authActions.updateWishList(IRIs));

      mutate(url, { ...products, ["hydra:member"]: newWishList }, false);

      console.log(IRIs);

      commonHttp.put(`/users/${userId}`, {
        wishList: IRIs,
      });
    }
  };

  if (!products) return (

    <DashboardLayout>

     <Spinner animation="border" variant="primary" />

      </DashboardLayout>
  );

  if (error) return <span>Une erreur est survenue !</span>;

  return (
    <DashboardLayout>
      
      <div className="d-flex justify-content-between">
         
      <h1 className="fs-4 fw-bold mb-3">Wishlist</h1>

      {products["hydra:member"].length > 0 && <ShareWishlist /> }

      </div>

      {products["hydra:member"].length > 0 ? (
        <Table>
          <tbody>
            {products["hydra:member"].map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="me-4">
                      <Link to={`/shop/product/${product.id}/${product.slug.toLowerCase()}`}>
                        <img
                          src={`${apiStorage}/${product.thumbnail}`}
                          className="img-fluid d-block mx-auto"
                          alt=""
                          style={{ height: 60, width: 60 }}
                        />
                      </Link>
                    </div>

                    <div className="d-flex flex-column">
                      <h6 className="mb-2">
                        <Link
                          to={`/shop/product/${product.id}/${product.slug.toLowerCase()}`}
                          className="text-dark"
                        >
                          {" "}
                          {product.title}
                        </Link>
                      </h6>

                      <div>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleClick(product.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} /> Retirer
                        </Button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) 
      
      : (
        <>
          <Alert variant="info" className="fw-medium text-center">
            Votre Wishlist est actuellement vide
          </Alert>
          <LinkContainer to="/shop">
            <Button className="d-table mx-auto">Continuer votre shoping</Button>
          </LinkContainer>
        </>
      )}
    
    </DashboardLayout>
  );

}
