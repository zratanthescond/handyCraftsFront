import { Spinner } from "react-bootstrap";
import DashboardLayout from "./dashboardLayout";

export default function DashboardLoader() {
  return (
    <DashboardLayout>
      <Spinner animation="border" variant="primary" />
    </DashboardLayout>
  );
}
