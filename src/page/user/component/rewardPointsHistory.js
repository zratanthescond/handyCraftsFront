import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import useSWR from "swr";
import DateFormat from "../../../common/util/dateFormat";

export default function RewardPointsHistory() {
  const { id: userId } = useSelector((state) => state.auth.userData);

  const { data: rewardPoints, error } = useSWR(
    `/reward_points_histories?user.id=${userId}`
  );

  if (!rewardPoints || error) return null;

  return (
    <>
      {rewardPoints["hydra:member"].length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Solde prédécent</th>
              <th>Points</th>
              <th>Nouveau solde</th>
            </tr>
          </thead>
          <tbody>
            {rewardPoints["hydra:member"].map((r) => (
              <tr key={r.id} className="fw-normal">
                <td>
                  <DateFormat date={r.createdAt} format="DD/MM/YYYY" />
                </td>
                <td>{r.currentPoints} Points</td>
                <td>
                  {" "}
                  {r.operation == "increment" ? "+" : "-"} {r.points} Points
                </td>
                <td>
                  <span className="text-success">{r.newPoints} Points</span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
