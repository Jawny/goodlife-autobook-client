import { lazy } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Button = lazy(() => import("../../common/Button"));

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button
      classNam="logout-button"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
