import { lazy } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Button = lazy(() => import("../../common/Button"));

const SignupButton = (props) => {
  const { loginWithRedirect } = useAuth0();
  const { text } = props;
  return (
    <Button
      className="signup-button"
      onClick={() =>
        loginWithRedirect({
          screen_hint: "signup",
        })
      }
    >
      {text || "Sign Up"}
    </Button>
  );
};

export default SignupButton;
