import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// import FirstInterface from "../Components1/FirstInterface.js"
import Interface from "../Components/Interface.js"
import Form from "../Components1/TOOLS/TypeForm.js";


export default () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component= {Form} />
        <Route exact path="/Graph" component= {Interface} />
      </Switch>
    </BrowserRouter>
  );
