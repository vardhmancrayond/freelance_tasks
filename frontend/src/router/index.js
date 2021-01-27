import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { HomePage } from "../screens";

const RouterApp = (props) => {
  return (
    <Router basename={`${process.env.PUBLIC_URL}`}>
      <Switch>
        <Route exact component={HomePage} path="/" {...props} />
      </Switch>
    </Router>
  );
};

export default RouterApp;
