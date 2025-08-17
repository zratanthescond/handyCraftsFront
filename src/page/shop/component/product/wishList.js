import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { commonHttp } from "../../../../util/http";
import authActions from "../../../../store/auth/authActions";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

export default function WishList({ product }) {
  const max = 10;

  const dispath = useDispatch();

  const history = useHistory();

  const auth = useSelector((state) => state.auth);

  const { isLogged } = auth;

  const productId = product["@id"];

  const wishListItems = isLogged ? auth.wishList : [];

  const inWishList = wishListItems.some((el) => productId == el);

  const handleClick = async (_) => {
    
    const toastConfig = { autoClose: 2000, onClick: () => history.push("/dashboard/wishlist") };

    if (!inWishList && wishListItems.length == max) {
      toast.error(`Vous ne pouvez pas ajouter plus de ${max} produits dans votre wishlist`);

      return;
    }

    const newWishList = !inWishList
      ? [...wishListItems, `/api/products/${product.id}`]
      : wishListItems.filter((el) => el !== productId);

    dispath(authActions.updateWishList(newWishList));

    try {
      await commonHttp.put(`/users/${isLogged && auth.userData.id}`, {
        wishList: newWishList,
      });

      if (!inWishList) {
        toast.success("Produit ajouté à votre wishlist", toastConfig);
      } else {
        toast.error("Produit retiré de votre wishlist", toastConfig);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const login = () => dispath(authActions.showModal());

  return (
    <Button onClick={isLogged ? handleClick : login} variant="link">
      <FontAwesomeIcon
        icon={!inWishList ? farHeart : faHeart}
        size="1x"
        color="#03cecb"
      />
    </Button>
  );
}
