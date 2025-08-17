import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import authActions from "../store/auth/authActions";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { isLogged } = useSelector((state) => state.auth);

  const dispatcher = useDispatch();

  useEffect(() => {
    if (!isLogged) {
      dispatcher(authActions.showModal());
    }
  }, [isLogged]);

  if (!isLogged) {
    return <Redirect to="/" />;
  }

  return <Component {...rest} />;
}
