import { useEffect } from "react";
import { useLocation } from "react-router";
import ReactGA from "react-ga";

export default function PageViewsTracking() {
  const { pathname } = useLocation();

  ReactGA.initialize("UA-213518302-1");

  useEffect(() => {
    ReactGA.pageview(pathname);
  }, [pathname]);

  return null;
}
