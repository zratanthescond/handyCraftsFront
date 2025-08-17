import { commonHttp } from "../util/http";
import store from "../store/store";
import authActions from "../store/auth/authActions";
export const login = () => {};

export const refreshToken = () => {
  let { refresh_token } = store.getState().auth;

  return commonHttp
    .post("/token/refresh", { refresh_token })
    .then((res) => {
      //  alert(res);
      return res.data;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        store.dispatch(authActions.logout());
      }
      console.log(err);
    });
};
