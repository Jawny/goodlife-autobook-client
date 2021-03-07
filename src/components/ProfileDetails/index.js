import { lazy } from "react";
import AccountStatus from "./AccountStatus";
import BillingPortalButton from "./BillingPortalButton";

const ProfileDetails = (props) => {
  const { userId } = props;
  return (
    <div>
      <AccountStatus userId={userId} />
      <BillingPortalButton />
    </div>
  );
};

export default ProfileDetails;
