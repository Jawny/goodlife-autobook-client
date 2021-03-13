import React, { useState, useEffect } from "react";
import { Badge } from "antd";
import {
  checkIfUserExists,
  checkIfSubscriptionActive,
  getUserData,
} from "../../api";

const AccountStatus = (props) => {
  const [status, setStatus] = useState("");
  const { userId } = props;

  useEffect(async () => {
    const userExists = await checkIfUserExists(userId);

    if (!userExists) {
      setStatus("INACTIVE");
      return;
    }

    // check if status is valid
    const userData = await getUserData(userId);
    const subId = userData.payment.subId;
    const subStatus = await checkIfSubscriptionActive(subId);

    if (subStatus.toLowerCase() === "active") {
      setStatus("ACTIVE");
      return;
    }
  }, []);

  return (
    <div className="account-status">
      Account Status:
      <div
        className={
          status.toLowerCase() === "active"
            ? "profile-status active"
            : "profile-status inactive"
        }
      >
        <Badge
          color={status.toLowerCase() === "active" ? "green" : "red"}
          status="processing"
          text={status !== "" ? status : "INACTIVE"}
        />
      </div>
    </div>
  );
};

export default AccountStatus;
