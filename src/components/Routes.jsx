import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Reclamations from "../pages/Reclamation";
import Factures from "../pages/Factures";
import Publicite from "../pages/Publicite";
const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/reclamation" component={Reclamations} />
      <Route path="/factures" component={Factures} />
      <Route path="/publicite" component={Publicite} />
    </Switch>
  );
};

export default Routes;
