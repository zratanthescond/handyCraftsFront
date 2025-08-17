import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {useSelector} from "react-redux";
import styles from "./style/cartHeader.module.scss";
import { priceFormater } from "../util/priceHelper";
import useDeviseDetect from "../util/deviseDetect";

export default function CartBtn() {

     const {items, total} = useSelector(state => state.cart);

     const itemsNumber = items.length;

     const totalPrice = priceFormater(total);

     const {isPhone} = useDeviseDetect();

     return (

          <LinkContainer to="/cart">
          
          <Button variant="link" className="shadow-none d-flex flex-row align-items-center position-relative p-0">

           <FontAwesomeIcon icon={faShoppingBasket} size={ isPhone ? "lg" : "2x"} className="me-1"/>

           <span className={styles.cartNumber}> { itemsNumber }</span>

           <div className="d-flex flex-column ms-2 text-start">

           <span className="d-none d-md-flex fw-medium">Panier</span>

           <span className="text-muted small fw-light d-none d-md-flex">{ totalPrice }</span>

           </div>   
              
            </Button>
          
          </LinkContainer>

     )
}