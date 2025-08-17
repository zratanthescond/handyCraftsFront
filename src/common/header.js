import useDeviseDetect from "../util/deviseDetect";
import HeaderInner from "./HeaderInner";
import HeaderInnerMobile from "./headerInnerMobile";
import PrimaryNav from "./primaryNav";
import TopBar from "./topbar";

export default function Header() {
  const { isPhone } = useDeviseDetect();

  const Header = () => {
    if (isPhone) return <HeaderInnerMobile />;

    return (
      <>
        <TopBar />

        <HeaderInner />
      </>
    );
  };

  return (
    <header>
      <Header />
      <PrimaryNav />
    </header>
  );
}
