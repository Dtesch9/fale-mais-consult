import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Consult from '../pages/Consult';
import Result from '../pages/Result';

const routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Consult} />
        <Route exact path="/result" component={Result} />
      </Switch>
    </Router>
  );
};

export default routes;
