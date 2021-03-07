import {
  checkIfUserExists,
  checkIfSubscriptionActive,
  getUserData,
} from "../../api";

const AccountStatus = (props) => {
  const { userId } = props;
  const status = async () => {
    const userExists = await checkIfUserExists(userId);

    if (!userExists) {
      return false;
    }

    // check if status is valid
    const userData = await getUserData(userId);
    const subId = userData.payment.subId;
    const subStatus = await checkIfSubscriptionActive(subId);

    if (subStatus.toLowerCase() === "active") {
      return true;
    }
    return false;
  };

  return <div className="profile-status">{status ? "ACTIVE" : "INACTIVE"}</div>;
};

export default AccountStatus;
