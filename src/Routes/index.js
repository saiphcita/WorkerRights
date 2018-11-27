import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import FirstInterface from "../Components1/FirstInterface.js"
import Interface from "../Components/Interface.js"
import Contracts from "../Components1/Contracts.js"

export default () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component= {FirstInterface} />
        <Route exact path="/Graph" component= {Interface} />
        <Route exact path="/Contratos" component= {Contracts} />
      </Switch>
    </BrowserRouter>
  );
