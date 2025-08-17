import { Container } from "react-bootstrap";
import useDeviseDetect from "../../util/deviseDetect";
import Brands from "./component/brands";
import FlashSales from "./component/flashSales";
import Grid from "./component/grid";
import ProductsTabs from "./component/ProductsTab";
import Reassurance from "./component/reassurance";
import { Helmet } from "react-helmet-async";

export default function Home() {
    const { isDesktop, isPhone } = useDeviseDetect();

    return (
        <>
            <Helmet>
                <title>Paramall : Parapharmacie en ligne en Tunisie</title>
            </Helmet>

            <Container className="mt-3 mt-md-0">
                <Grid />

                {isDesktop && <Reassurance />}

                <FlashSales />

                <ProductsTabs />

                <Brands />

                {isPhone && <Reassurance />}

            </Container>
        </>
    );
}
