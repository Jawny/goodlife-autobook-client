import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Home, Profile } from "./pages";
import "./App.css";

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </div>
  );
};

export default App;
