import { useDispatch, useSelector } from "react-redux";
import { apiStorage } from "../../../config/api/api";
import { Table, CloseButton } from "react-bootstrap";
import { priceFormater } from "../../../util/priceHelper";
import { Link } from "react-router-dom";
import cartActions from "../../../store/cart/cartActions";
import ProductQuantity from "./productQuantity";

export default function DesktopCartItems() {
  const { items } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>Produit(s)</th>
          <th>Prix unitaire</th>
          <th>Quantité</th>
          <th>Total</th>
        </tr>
      </thead>

      <tbody>
        {items.map((item) => (
          <tr key={item.product.id}>
            <td className="d-flex align-items-center">
              <span className="me-2">
                <Link to={`/shop/product/${item.product.id}/${item.product.slug.toLowerCase()}`}> 
                  <img
                    src={`${apiStorage}/${item.product.thumbnail}`}
                    className="img-fluid"
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                    alt=""
                  />

                  <span className="text-dark">{item.product.title}</span>
                </Link>
              </span>

              <CloseButton
                onClick={() => dispatch(cartActions.remove(item.product))}
              />
            </td>

            <td>
              {item.product.discount && !item.product.discount.isExpired ? (
                <div className="d-flex flex-row justify-content-arround">
                  <div className="d-flex flex-column">
                    <span className="text-decoration-line-through text-danger small me-2">
                      {priceFormater(item.product.price)}
                    </span>

                    <span>{priceFormater(item.product.discount.newPrice)}</span>
                  </div>

                  <div className="d-flex align-self-center text-white ms-3">
                    <span className="small bg-success rounded p-1">
                      - {item.product.discount.pourcentage} %
                    </span>
                  </div>
                </div>
              ) : (
                <span>{priceFormater(item.product.price)}</span>
              )}
            </td>

            <td><ProductQuantity item={item} /> </td>

            <td>
              <span>
                {item.product.discount && !item.product.discount.isExpired ? (
                  <span>
                    {priceFormater(item.product.discount.newPrice * item.qty)}
                  </span>
                ) : (
                  <span>{priceFormater(item.product.price * item.qty)}</span>
                )}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
