import { lazy } from "react";

const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));

const Success = () => {
  return (
    <Container>
      <MiddleBlock
        title="Success!"
        content="We have processed your transaction. Please wait up to 24 hours for our system to begin scheduling your workouts."
        button={false}
      />
    </Container>
  );
};

export default Success;
