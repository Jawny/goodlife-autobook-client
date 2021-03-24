import ReactDOM from "react-dom";
import ReactGA from "react-ga";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import "antd/dist/antd.css";

import Router from "./router";
import i18n from "./translation";
import * as serviceWorker from "./serviceWorker";

const trackingId = process.env.REACT_APP_GOOGLE_ANALYTICS; // Replace with your Google Analytics tracking ID

ReactGA.initialize(trackingId);

const App = () => (
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      {/* <I18nextProvider i18n={i18n}> */}
      <Router />
      {/* </I18nextProvider> */}
    </Auth0ProviderWithHistory>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
