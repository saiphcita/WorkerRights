import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import FirstInterface from "../Components1/FirstInterface.js"
import Interface from "../Components/Interface.js"

export default () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component= {FirstInterface} />
        <Route exact path="/Graph" component= {Interface} />
      </Switch>
    </BrowserRouter>
  );
