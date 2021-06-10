import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Shop from './Pages/Shop/Shop';
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
          <Route exact path="/login" component={Login} />
          <Route exact path="/shop" component={Shop} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
