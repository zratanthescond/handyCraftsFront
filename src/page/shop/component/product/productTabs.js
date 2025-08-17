import { useContext } from "react";
import useSWR from "swr";
import ProductPageContext from "../../../../context/product/ProductPageContext";
import { Tabs, Tab, Card } from "react-bootstrap";

export default function ProductTabs() {
  
  const { product } = useContext(ProductPageContext);

  const url = `/product_infos?product.id=${product.id}`;

  const { data, error } = useSWR(url);

  const tabs = data ? data["hydra:member"] : [];

  const tabsIsEmtpy = tabs.length === 0;

  if (!data || error || tabsIsEmtpy) return (null);

  return (
      
    <Card>
      <Card.Body>
        <Tabs defaultActiveKey={tabs[0].id}>
          {tabs.map((tab) => (
            <Tab eventKey={tab.id} title={tab.title} key={tab.id}>
              <div className="content mt-3">{tab.content}</div>
            </Tab>
          ))}
        </Tabs>
      </Card.Body>
    </Card>
      
  );
}
