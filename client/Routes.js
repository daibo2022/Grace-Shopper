import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './components/AuthForm';
import Home from './components/Home';
import Cart from './components/Cart';
import SingleProduct from './components/SingleProduct';
import AllProducts from './components/AllProducts';
import Eye from './components/Eye';
import Face from './components/Face';
import Lip from './components/Lip';
import Nail from './components/Nail';
import CreateUser from './components/CreateUser';
import Checkout from './components/Checkout';
import GuestCart from './components/GuestCart';
import { me } from './store/auth';
import Admin from './components/Admin';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    // NOTE: Be careful with conditional redirects. Redirects must be okay in all conditions!
    // NOTE: Components load too fast, so conditional redirects may be tricky to implement!
    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path='/products/eye' component={Eye} />
            <Route exact path='/products/lip' component={Lip} />
            <Route exact path='/products/face' component={Face} />
            <Route exact path='/products/nail' component={Nail} />
            <Route exact path='/signup' component={CreateUser} />
            <Route exact path='/products' component={AllProducts} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/cart/checkout/:cartId' component={Checkout} />

            {isAdmin && <Route exact path='/login/admin' component={Admin} />}

            {isAdmin ? (
              <Redirect from='/login' to='/login/admin' />
            ) : (
              <Redirect from='/login' to='/' />
            )}

            <Route exact path='/products/:id' component={SingleProduct} />

            <Route path='/' component={Home} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path='/products/eye' component={Eye} />
            <Route exact path='/products/lip' component={Lip} />
            <Route exact path='/products/face' component={Face} />
            <Route exact path='/products/nail' component={Nail} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={CreateUser} />
            <Route exact path='/products' component={AllProducts} />
            <Route exact path='/' component={Home} />
            <Route exact path='/cart' component={GuestCart} />

            <Route exact path='/products/:id' component={SingleProduct} />
            <Redirect from='/logout' to='/' />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    // if id exist, isLoggedIn is true; otherwise, false
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.userType == 'admin',
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
