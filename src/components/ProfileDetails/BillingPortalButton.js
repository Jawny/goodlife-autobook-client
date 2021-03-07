import React, { lazy, useState, useEffect } from "react";
import { notification } from "antd";
import {
  createBillingInformationPortal,
  checkIfUserExists,
  getUserData,
} from "../../api";

const Button = lazy(() => import("../../common/Button"));

const BillingPortalButton = (props) => {
  const [hasBillingInfo, setHasBillingInfo] = useState(false);
  const [billingUrl, setBillingUrl] = useState("");
  const { userId } = props;

  useEffect(async () => {
    const userExists = await checkIfUserExists(userId);

    if (!userExists) {
      setHasBillingInfo(false);
      return;
    }
    setHasBillingInfo(true);
    // check if status is valid
    const userData = await getUserData(userId);
    const customerId = userData.payment.customerId;
    const url = await createBillingInformationPortal(customerId);
    setBillingUrl(url);
  }, []);

  const openNotification = () => {
    notification.open({
      message: "No Billing Information Found",
      description:
        "We are unable to retrieve your billing information. If this is an error please contact us.",
    });
  };

  const openBillingPortal = () => {
    window.location.replace(billingUrl);
  };

  return (
    <Button
      className="billing-portal-button"
      onClick={hasBillingInfo ? openBillingPortal : openNotification}
    >
      Manage Billing
    </Button>
  );
};

export default BillingPortalButton;
