import { Table, ListGroup } from "react-bootstrap";
import { useParams } from "react-router";
import useSWR from "swr";
import DateFormat from "../../common/util/dateFormat";
import DashboardLayout from "./component/dashboardLayout";
import { priceFormater } from "../../util/priceHelper";
import useRewardPoints from "../../hook/useRewardPoints";
import DashboardLoader from "./component/dashboardLoader";

export default function ClientOrder() {
  const { id } = useParams();

  const url = `/orders/${id}`;

  const { data: order, error } = useSWR(url);

  const { discount } = useRewardPoints(order ? order.rewardPointsToConsume : 0);

  if (!order || error) return <DashboardLoader />;

  return (
    <DashboardLayout>
      <h1 className="fs-4 fw-bold mb-3">Commande numéro {order.id}</h1>

      <ListGroup className="mb-4">
        <ListGroup.Item>
          Date: <DateFormat date={order.createdAt} format="DD/MM/YYYY" />
        </ListGroup.Item>

        <ListGroup.Item>
          Méthode de paiement:{" "}
          {order.payementTransaction ? "Par carte bancaire " : "A la livraison"}
        </ListGroup.Item>

        <ListGroup.Item>
          Adresse de livraison : {order.user.defaultAddress}
        </ListGroup.Item>

        <ListGroup.Item>
          Méthode de livraison : {order.delivery.name}
        </ListGroup.Item>

        {order?.aramexShipement?.tracking && (
          <ListGroup.Item>
            Numéro de colis: {order.aramexShipement.trackingId}
          </ListGroup.Item>
        )}

        {order?.aramexShipement?.tracking && (
          <ListGroup.Item>
            Statut de livraison:{" "}
            {order.aramexShipement.tracking.data.UpdateDescription}
          </ListGroup.Item>
        )}

        <ListGroup.Item>
          Sous-total : {priceFormater(order.subtotal)}
        </ListGroup.Item>

        <ListGroup.Item>
          Frais de livraison : {priceFormater(order.delivery.price)}
        </ListGroup.Item>
        {order.rewardPointsToConsume > 0 && (
          <ListGroup.Item>
            Réduction sur {order.rewardPointsToConsume} points de fidélité :{" "}
            <span className="text-danger">-{priceFormater(discount)}</span>
          </ListGroup.Item>
        )}

        {order.discountCode && (
          <ListGroup.Item>
            Code promo {order.discountCode.code} :{" "}
            <span className="text-danger">
              -{order.discountCode.percentage}%
            </span>
          </ListGroup.Item>
        )}

        <ListGroup.Item>Total : {priceFormater(order.total)}</ListGroup.Item>
      </ListGroup>

      <Table variant="light" bordered hover>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((productOrder) => (
            <tr key={productOrder.id}>
              <td>{productOrder.product.title}</td>
              <td>{productOrder.qty}</td>
              <td>
                {productOrder.product.discount ? (
                  <span>
                    {priceFormater(
                      productOrder.product.discount.newPrice * productOrder.qty
                    )}
                  </span>
                ) : (
                  <span>
                    {priceFormater(
                      productOrder.product.price * productOrder.qty
                    )}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </DashboardLayout>
  );
}
