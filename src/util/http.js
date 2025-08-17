import axios from "axios";
import { apiEndPoint } from "../config/api/api";
import { refreshToken } from "../service/auth";
import authActions from "../store/auth/authActions";
import store from "../store/store";

let { token } = store.getState().auth;

store.subscribe(listener);

function listener() {
  token = store.getState().auth.token;
}

export const commonHttp = axios.create({
  baseURL: apiEndPoint,
});

commonHttp.interceptors.request.use((config) => {
  if (token) {
    ///console.log("my token", token);

    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

commonHttp.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.data.message === "Expired JWT Token" &&
      error.response.status === 401
    ) {
      const newTokens = await refreshToken();
      console.log(newTokens);
      if (newTokens.token) {
        store.dispatch(authActions.RefreshToken(newTokens));

        originalRequest._retry = true;
        originalRequest.headers["Authorization"] = "Bearer " + newTokens.token;
        //console.log(newTokens);
        return axios(originalRequest);
      } else {
        store.dispatch(authActions.logout());
      }
    }
    return Promise.reject(error);
  }
);
