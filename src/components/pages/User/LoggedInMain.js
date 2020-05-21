import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './../../../App.css';
import Header from './../common/Header'
import Footer from './../common/Footer'

import routesLoggedIn from './../../helper/RoutesLoggedIn';
import { connect } from 'react-redux'
import { userData } from './../../../redux-store/actions/ActionUserData'
class LoggedInMain extends Component {

  render() {
    const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    return (
      <div className="App" >
        <Router basename="/" >
          <React.Suspense fallback={loading()}>
            <Header />
            <Switch>
              {
                routesLoggedIn.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => (
                        <route.component {...props} />
                      )} />
                  ) : (null);
                })
              }
              <Redirect to='/user/dashboard' />
            </Switch>
            <Footer />
          </React.Suspense>
        </Router>
      </div>
    );
  }

}


const mapStateToProps = (state, own_props) => {

  const { user } = state;
  return {
    user
  }
}

const actions = {
  userData
}

export default connect(mapStateToProps, actions)(LoggedInMain)