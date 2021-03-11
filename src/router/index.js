import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import Footer from "../components/Footer";
import Header from "../components/Header";
import StripeContainer from "../pages/Profile/StripeContainer";
import Error from "../pages/Payment/Error";
import Success from "../pages/Payment/Success";
import TOS from "../pages/TOS";
import Privacy from "../pages/Privacy";
import routes from "./config";
import GlobalStyles from "../globalStyles";

const Router = () => {
  return (
    <Suspense fallback={null}>
      <GlobalStyles />
      <Header />
      <Switch>
        {routes.map((routeItem) => {
          return (
            <Route
              key={routeItem.component}
              path={routeItem.path}
              exact={routeItem.exact}
              component={lazy(() => import(`../pages/${routeItem.component}`))}
            />
          );
        })}
        <ProtectedRoute path="/profile" exact component={StripeContainer} />
        <Route path="/error" exact component={Error} />
        <Route path="/success" exact component={Success} />
        <Route path="/tos" exact component={TOS} />
        <Route path="/privacy" exact component={Privacy} />
      </Switch>
      <Footer />
    </Suspense>
  );
};

export default Router;
