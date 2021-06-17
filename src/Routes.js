import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';
import Shop from './Pages/Shop/Shop';
import Nav from './Components/Nav/Nav';
import Main from './Pages/Main/Main';
import Basket from './Pages/Basket/Basket';
import Payment from './Pages/Payment/Payment';
import Detail from './Pages/Detail/Detail';
import './Style/reset.scss';
import './Style/common.scss';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/shop/basket" component={Basket} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/shop/detail/:product_id" component={Detail} />
          <Route exact path="/payment" component={Payment} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
