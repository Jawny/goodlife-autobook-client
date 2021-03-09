import { lazy } from "react";

const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));

const Error = () => {
  return (
    <Container>
      <MiddleBlock
        title="Error"
        content="We were unable to process your transaction."
        button={false}
      />
    </Container>
  );
};

export default Error;
