import { ToastContainer } from "react-toastify";
import Footer from "../common/footer";
import Header from "../common/header";
import "react-toastify/dist/ReactToastify.css";
import FixedSideBar from "../common/fixedSideBar";
import PopUp from "../common/popUp";

export default function DefaultLayout({ children }) {
  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />

      <ToastContainer />

      <PopUp />

      <FixedSideBar />
    </>
  );
}
