import { lazy } from "react";
import ReactGA from "react-ga";

const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));

const Success = () => {
  ReactGA.pageview("/success");

  return (
    <Container>
      <MiddleBlock
        title="Success!"
        content="We have processed your transaction. Enter your schedule details in the profile menu to allow our system to begin booking for you! Allow up to 24 hours for our system register your schedule details."
        button={false}
      />
    </Container>
  );
};

export default Success;
