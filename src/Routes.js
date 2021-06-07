import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './Style/reset.scss';
import './Style/common.scss';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch></Switch>
      </Router>
    );
  }
}

export default Routes;
