import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Nav from './Components/Nav/Nav';
import Main from './Pages/Main/Main';

import './Style/reset.scss';
import './Style/common.scss';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Main} /> 
        </Switch>
      </Router>
    );
  }
}

export default Routes;
