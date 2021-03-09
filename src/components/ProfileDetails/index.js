import AccountStatus from "./AccountStatus";
import BillingPortalButton from "./BillingPortalButton";
import CurrentBookingDisplay from "./CurrentBookingsDisplay";
import "./ProfileDetails.css";

const ProfileDetails = (props) => {
  const { userId } = props;

  return (
    <div className="profile-details">
      <AccountStatus userId={userId} />
      <CurrentBookingDisplay userId={userId} />
      <BillingPortalButton userId={userId} />
    </div>
  );
};

export default ProfileDetails;
