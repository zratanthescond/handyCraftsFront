const add = (product, qty = 1) => {
  return {
    type: "ADD",
    payload: { product, qty },
  };
};

const remove = (product) => {
  return {
    type: "REMOVE",
    payload: { product },
  };
};

const addDelivery = (deliveryType) => {
  return {
    type: "ADD_DELIVERY",
    payload: { deliveryType },
  };
};

const addDiscountCode = (discountCode) => {
  return {
    type: "ADD_DISCOUNT_CODE",
    payload: { discountCode },
  };
};

const addRewardsPoints = (rewardsPointsToConsume, rewardsPointsDiscount) => {
  rewardsPointsDiscount = parseFloat(rewardsPointsDiscount.toFixed(1));

  return {
    type: "ADD_REWARD_POINTS",
    payload: { rewardsPointsToConsume, rewardsPointsDiscount },
  };
};

const updateProductQty = (productId, qty) => {
  return {
    type: "UPDATE_PRODUCT_QTY",
    payload: { productId, qty },
  };
};

const clearCart = () => {
  return {
    type: "CLEAR_CART",
    payload: {},
  };
};

const addPayment = (payment) => {
  return {
    type: "ADD_PAYMENT",
    payload: { payment },
  };
};

const addPaymentRef = (ref) => {
  return {
    type: "ADD_PAYMENT_REF",
    payload: ref,
  };
};

const cartActions = {
  add,
  remove,
  updateProductQty,
  addDelivery,
  addDiscountCode,
  clearCart,
  addPayment,
  addPaymentRef,
  addRewardsPoints,
};

export default cartActions;
