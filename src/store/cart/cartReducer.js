const defaultState = {
  items: [],
  cartIsEmpty: true,
  delivery: null,
  total: 0,
  subtotal: 0,
  payment: null,
  orderDiscount: 0,
  discountCode: null,
  paymentRef: null,
  rewardsPoints: {
    rewardsPointsToConsume: 0,
    rewardsPointsDiscount: 0,
  },
};
 const getDiscountValue=(items)=>{
   let notDiscounted=0;
         items.forEach(item=>{
           console.log(item)
          if (item.product.discount===null || item.product.discount.isExpired) {
                 console.log('sqdqsqd');
                 notDiscounted+= item.product.price * item.qty;
              }
         })
         return notDiscounted;
 }
const initialState = localStorage.getItem("cart") || defaultState;

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD": {
      const items = [
        ...state.items.filter(
          (item) => item.product.id !== action.payload.product.id
        ),
        {
          product: action.payload.product,
          qty: action.payload.qty,
        },
      ];

      let total = items.reduce((total, item) => {
        if (item.product.discount && !item.product.discount.isExpired) {
          return total + item.product.discount.newPrice * item.qty;
        }

        return total + item.product.price * item.qty;
      }, 0);

      let subtotal = total;

      /* Delivery is free from 99 TND */

      if (state.discountCode) {
        
        let notDiscounted=getDiscountValue(items);
        
        let discountValue = (notDiscounted* state.discountCode.percentage) / 100;
        console.log(notDiscounted);
        total -= discountValue;
      }

      if (state.rewardsPoints.rewardsPointsToConsume > 0) {
        total -= state.rewardsPoints.rewardsPointsDiscount;
      }

      if (state.delivery && subtotal < 99) {
        total += state.delivery.price;
      }

      let newState = {
        ...state,
        items: items,
        total: total,
        subtotal: subtotal,
        cartIsEmpty: items.length === 0,
      };

      localStorage.setItem("cart", JSON.stringify(newState));

      return newState;
    }

    case "REMOVE": {
      const items = [
        ...state.items.filter(
          (item) => item.product.id !== action.payload.product.id
        ),
      ];

      let total = items.reduce((total, item) => {
        if (item.product.discount) {
          return total + item.product.discount.newPrice * item.qty;
        }

        return total + item.product.price * item.qty;
      }, 0);

      let subtotal = total;

      let cartIsEmpty = items.length === 0;

      if (!cartIsEmpty) {
        if (state.delivery && total < 99) {
          total += state.delivery.price;
        }

        if (state.rewardsPoints.rewardsPointsToConsume > 0) {
          total -= state.rewardsPoints.rewardsPointsDiscount;
        }

        if (state.discountCode) {
          let discountValue = (total * state.discountCode.percentage) / 100;

          total -= discountValue;
        }
      }

      if (cartIsEmpty) {
        localStorage.removeItem("cart");

        return defaultState;
      }

      let newState = {
        ...state,
        items: items,
        total: total,
        subtotal: subtotal,
        cartIsEmpty: cartIsEmpty,
      };

      localStorage.setItem("cart", JSON.stringify(newState));

      return newState;
    }

    case "ADD_DELIVERY": {
      let newTotal = 0;
      // Apply delivery discount

      let deliveryPrice = action.payload.deliveryType.price;

      if (state.total >= 99) {
        newTotal = state.total;
      }

      // if client does not choose yet delivery
      else if (!state.delivery) {
        newTotal = state.total + deliveryPrice;
      } else {
        // remove prev delivery  price

        let prevTotal = state.total - state.delivery.price;

        newTotal = prevTotal + deliveryPrice;
      }

      let newState = {
        ...state,
        delivery: action.payload.deliveryType,
        total: newTotal,
      };

      localStorage.setItem("cart", JSON.stringify(newState));

      return newState;
    }

    case "ADD_REWARD_POINTS": {
      // remove prev rewardsPointsDiscount

      let totalWithoutPrevDiscount =
        state.total + state.rewardsPoints.rewardsPointsDiscount;

      let newState = {
        ...state,
        rewardsPoints: action.payload,
        total: totalWithoutPrevDiscount - action.payload.rewardsPointsDiscount,
      };

      localStorage.setItem("cart", JSON.stringify(newState));

      return newState;
    }

    case "ADD_DISCOUNT_CODE": {
      // remove delivery and discount and apply discount
    
      let subtotal = state.subtotal;
        let notDiscounted=getDiscountValue(state.items);
      let discountValue =
        (notDiscounted * action.payload.discountCode.percentage) / 100;

      let newTotal = subtotal - discountValue;

      if (state.delivery && subtotal < 99) {
        newTotal += state.delivery.price;
      }

      if (state.rewardsPoints.rewardsPointsToConsume > 0) {
        newTotal -= state.rewardsPoints.rewardsPointsDiscount;
      }

      let newState = {
        ...state,
        total: newTotal,
        discountCode: action.payload.discountCode,
      };

      localStorage.setItem("cart", JSON.stringify(newState));

      return newState;
    }

    case "ADD_PAYMENT": {
      return {
        ...state,
        payment: action.payload.payment,
      };
    }

    case "UPDATE_PRODUCT_QTY": {
      let itemIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.productId
      );

      state.items[itemIndex].qty = action.payload.qty;

      let items = state.items;

      let total = items.reduce((total, item) => {
        if (item.product.discount && !item.product.discount.isExpired) {
          return total + item.product.discount.newPrice * item.qty;
        }

        return total + item.product.price * item.qty;
      }, 0);

      let subtotal = total;

      /* Delivery is free from 99 TND */

      if (state.discountCode) {
        let notDiscounted=getDiscountValue(state.items);
        console.log(notDiscounted);
        let discountValue = (notDiscounted * state.discountCode.percentage) / 100;
        total -= discountValue;
      }

      if (state.rewardsPoints.rewardsPointsToConsume > 0) {
        total -= state.rewardsPoints.rewardsPointsDiscount;
      }

      if (state.delivery && subtotal < 99) {
        total += state.delivery.price;
      }

      let newState = {
        ...state,
        items: items,
        total: total,
        subtotal: subtotal,
        cartIsEmpty: items.length === 0,
      };

      localStorage.setItem("cart", JSON.stringify(newState));

      return newState;
    }

    case "CLEAR_CART":
      localStorage.removeItem("cart");

      return defaultState;

    case "ADD_PAYMENT_REF": {
      let newState = { ...state, paymentRef: action.payload };

      localStorage.setItem("cart", JSON.stringify(newState));

      return newState;
    }

    default:
      if (typeof state == "string") {
        return JSON.parse(state);
      }

      return state;
  }
};

export default cartReducer;
