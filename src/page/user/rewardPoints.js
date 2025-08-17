import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import useSWR from "swr";
import useRewardPoints from "../../hook/useRewardPoints";
import DashboardLayout from "./component/dashboardLayout";
import DashboardLoader from "./component/dashboardLoader";
import RewardPointsHistory from "./component/rewardPointsHistory";
import { priceFormater } from "../../util/priceHelper";

export default function RewardWoint() {
  const { id } = useSelector((state) => state.auth.userData);

  const { data: user, error } = useSWR(`/users/${id}`);

  const { discount } = useRewardPoints(user?.rewardPoints);

  if (!user || error) return <DashboardLoader />;

  return (
    <DashboardLayout>
      <h1 className="fs-4 fw-bold mb-3">Mes points de fidélité</h1>

      <Alert variant="info text-center fw-bold">
        Vous avez <strong>{user.rewardPoints}</strong> points de fidélité{" "}
        {user.rewardPoints > 0 && (
          <span>vous offrant {priceFormater(discount)} de réduction</span>
        )}
      </Alert>

      <RewardPointsHistory />
    </DashboardLayout>
  );
}
