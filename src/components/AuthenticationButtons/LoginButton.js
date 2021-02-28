import { lazy } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Button = lazy(() => import("../../common/Button"));

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button className="login-button" onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  );
};

export default LoginButton;
