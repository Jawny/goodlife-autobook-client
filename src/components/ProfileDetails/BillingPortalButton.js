import { lazy } from "react";

const Button = lazy(() => import("../../common/Button"));

const BillingPortalButton = (url) => {
  return (
    <Button
      className="billing-portal-button"
      onClick={() => window.location.replace(url)}
    >
      Manage Billing
    </Button>
  );
};

export default BillingPortalButton;
