import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { apiBaseUrl } from "../../../config/api/api";
import { useDispatch } from "react-redux";
import cartActions from "../../../store/cart/cartActions";
import useSWR from "swr";
import { commonHttp } from "../../../util/http";

export default function GpgPayement() {
  const url =
    "https://www.gpgcheckout.com/Paiement/Validation_paiement.php";

  const {
    items,
    subtotal,
    delivery,
    total,
    rewardsPoints,
    discountCode,
    paymentRef,
  } = useSelector((state) => state.cart);

  const {
    userData: { id },
  } = useSelector((state) => state.auth);

  const { data: userData } = useSWR(`/users/${id}`);

  const { data: userAddress } = useSWR(`/user_addresses?user.id=${id}`);

  const address = userAddress
    ? userAddress["hydra:member"].find((ad) => ad.isDefault === true)
    : null;

  const totalIntl = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 3,
  }).format(total);

  const totalFormat = totalIntl.includes(",")
    ? totalIntl.replace(",", "")
    : totalIntl;

  const orderProducts = items.map((item) => item.product.title).join();

  const dispatch = useDispatch();

  const params = {
    orderProducts: orderProducts,
    Amount: totalFormat,
    Currency: "TND",
    Language: "fr",
    CustCountry: "Tunisie",
    PayementType: "1",
    AmountSecond: "",
    vad: "848800003",
    Terminal: "001",
    tauxConversion: "",
    BatchNumber: "",
    MerchantReference: "",
    Reccu_Num: "",
    Reccu_ExpiryDate: "",
    Reccu_Frecuency: "",
  };

  const [data, setData] = useState(params);

  const [isLoading, setIsLoading] = useState(false);

  const [disabled, setDisabled] = useState(false);

  const handleDisabled = () => setDisabled(true);

  const ref = useRef(null);

  const handleSubmit = (e) => {
    handleDisabled();

    e.preventDefault();

    const orderData = {
      delivery,
      user: { id: userData.id },
      items,
      subtotal,
      total,
      paymentRef: paymentRef,
      rewardPointsToConsume: rewardsPoints.rewardsPointsToConsume,
    };

    if (discountCode) {
      orderData.discountCodeId = discountCode.id;
    }

    const makeOrder = async () => {
      try {
        const req = await commonHttp.post("/orders/make", orderData);

        const { id } = req.data;

        ref.current.submit();
      } catch (err) {
        console.log(err);
      }
    };

    makeOrder();
  };

  useEffect(async () => {
    const fetch = async () => {
      setIsLoading(true);

      const res = await axios.post(`${apiBaseUrl}/gpgdata`, {
        amount: totalFormat,
      });

      const { orderID } = res.data;

      dispatch(cartActions.addPaymentRef(orderID));

      if (userData && address) {
        const details = {
          EMAIL: userData.email,
          CustZIP: address.postalCode,
          CustCity: address.town,
          CustAddress: address.address,
          CustLastName: userData.lastName,
          CustFirstName: userData.firstName,
          CustTel: userData.phoneNumber,
        };

        setData({ ...data, ...details, ...res.data });
      }
    };

    await fetch();

    setIsLoading(false);
  }, [userData, address]);

  if (!userData && !address) return null;

  return (
    <>
      <form action={url} method="POST" ref={ref} onSubmit={handleSubmit}>
        {Object.entries(data).map(([key, value, index]) => (
          <Fragment key={Math.random()}>
            <input type="hidden" name={key} value={value} readOnly />
          </Fragment>
        ))}

        <Button
          type="submit"
          className="d-table mx-auto pe-4 ps-4"
          disabled={disabled}
        >
          Payer ma commande
        </Button>
      </form>
    </>
  );
}
