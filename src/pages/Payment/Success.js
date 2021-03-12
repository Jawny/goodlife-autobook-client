import { lazy } from "react";

const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));

const Success = () => {
  return (
    <Container>
      <MiddleBlock
        title="Success!"
        content="We have processed your transaction. Enter your schedule details in the profile menu to allow our system to begin booking for you!"
        button={false}
      />
    </Container>
  );
};

export default Success;
