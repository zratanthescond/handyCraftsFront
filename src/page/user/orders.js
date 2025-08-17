import { Alert, Table, Button, Spinner} from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useHistory } from "react-router-dom";
import useSWR from "swr";
import DateFormat from "../../common/util/dateFormat";
import { priceFormater } from "../../util/priceHelper";
import DashboardLayout from "./component/dashboardLayout";

export default function ClientOrders() {
  const { userData } = useSelector((state) => state.auth);

  const url = `/orders?user.id=${userData.id}`;

  const { data, error } = useSWR(url);

  const history = useHistory();

  const redirectToOrder = id => history.push(`/dashboard/orders/${id}`);
 
  if (!data) return (

    <DashboardLayout>

     <Spinner animation="border" variant="primary" />

      </DashboardLayout>
  );

  if (error) return null;

  return (
    <DashboardLayout>
      <h1 className="fs-4 fw-bold mb-3">Mes commandes</h1>
      {data["hydra:totalItems"] == 0 ? (
          <>
        <Alert>Vous n'avez aucune commande</Alert>
        <LinkContainer to="/shop"><Button>Commencer vos achats</Button></LinkContainer>
        </>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Numéro</th>
              <th>Date</th>
              <th>Nombre de produits</th>
              <th>Livraison</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data["hydra:member"].map((order) => (
              <tr key={order.id} onClick={() => redirectToOrder(order.id)} style={{cursor: "pointer"}}>
                <td>
                  <Link to={`/dashboard/orders/${order.id}`}>
                    <span>{order.id}</span>
                  </Link>
                </td>
                <td><DateFormat date={order.createdAt} format="D/M/YYYY" /></td>
                <td>{order.productsNumber} produit(s)</td>
                <td>{ order.delivery.name }</td>
                <td><span className="text-success">{priceFormater(order.total)}</span></td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </DashboardLayout>
  );
}
