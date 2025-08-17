const login = (resData) => {
  const userData = {
    ...resData,
    isLogged: true,
    wishList: resData.userData.wishList,
  };

  localStorage.setItem("token", JSON.stringify(userData));

  return {
    type: "LOGIN",
    payload: userData,
  };
};

const logout = () => {
  localStorage.removeItem("token");

  return {
    type: "LOGOUT",
  };
};

const RefreshToken = (tokens) => {
  const oldTokens = JSON.parse(localStorage.getItem("token"));

  const newTokens = { ...oldTokens, ...tokens };

  localStorage.setItem("token", JSON.stringify(newTokens));

  return {
    type: "REFRESH_TOKEN",
    payload: tokens,
  };
};

const showModal = () => {
  return {
    type: "SHOW_MODAL",
  };
};

const hideModal = () => {
  return {
    type: "HIDE_MODAL",
  };
};

const updateWishList = (wishList) => {
  return {
    type: "UPDATE_WISHLIST",
    payload: wishList,
  };
};

const authActions = {
  login,
  logout,
  RefreshToken,
  showModal,
  hideModal,
  updateWishList,
};

export default authActions;
