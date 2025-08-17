const initialState = localStorage.getItem("token") || {
  userData: {},
  isLogged: false,
  modal: false,
  wishList: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_MODAL":
      return {
        ...state,
        modal: true,
      };

    case "HIDE_MODAL":
      return {
        ...state,
        modal: false,
      };

    case "LOGIN":
      return {
        ...action.payload,
      };

    case "LOGOUT":
      return {
        ...initialState,
      };

    case "REFRESH_TOKEN":
      return {
        ...state,
        ...action.payload.tokens,
      };

    case "UPDATE_WISHLIST": {
      localStorage.setItem("token", JSON.stringify({...state, wishList: action.payload})); // we need to refresh the list
      return {
        ...state,
        wishList: action.payload,
      };
    }

    default:
      if (typeof state == "string") {
        //console.log(state);
        return JSON.parse(state);
      }

      return state;
  }
};

export default authReducer;
