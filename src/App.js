import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';



import { connect } from 'react-redux'
import { userData } from './redux-store/actions/ActionUserData'
// import { ROUTES } from './helpers/RoutePaths';

import { LocalStorage } from './components/helper/LocalStorage';

const Login = React.lazy(() => import('./components/pages/User/Login'));
const Signup = React.lazy(() => import('./components/pages/User/Signup'));
const Dashboard = React.lazy(() => import('./components/pages/User/Dashboard'));
const Voting = React.lazy(() => import('./components/pages/User/Voting'));
const Main = React.lazy(() => import('./components/pages/Main'));
const LoggedInMain = React.lazy(() => import('./components/pages/User/LoggedInMain'));


const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1c59bd',
    },
    secondary: indigo
  },
  overrides: {
    MuiInput: {
      underline: {
        "&&&&:hover:before": {
          borderBottom: "1px solid rgba(0, 0, 0, 0.42)"
        }
      }
    }
  }
});

class App extends Component {


  componentDidMount() {
    this.checkLoginStatus()
  }

  render() {
    console.log("this.props.user.token", this.props.user.token)

    if (this.props.user.token) {
      return (
        <Router  >
          <React.Suspense fallback={loading()}>
            <MuiThemeProvider theme={theme}>
              <Switch>
                {/* 
								<Route exact path={ROUTES.err_404} name="Page 404" render={props => <Page404 {...props} />} />
								<Route exact path={ROUTES.err_500} name="Page 500" render={props => <Page500 {...props} />} /> */}
                <Route exact path="/user/new-election/voting" name="Voting" render={props => <Voting {...props} />} /> */}
                <Route path="/user/dashboard" name="Home" render={props => <LoggedInMain {...props} />} />
                {/* <Route exact path="/user/dashboard" name="Dashboard" render={props => <Dashboard {...props} />} /> */}
                <Redirect to="/user/dashboard" />
              </Switch>
            </MuiThemeProvider>
          </React.Suspense>
        </Router>
      );
    } else {
      return (
        <Router basename="/">
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route path="/" name="Home" render={props => <Main {...props} />} />
              <Redirect to="/home" />
            </Switch>
          </React.Suspense>
        </Router>
      )
    }

  }


  checkLoginStatus = () => {
    const jwt = new LocalStorage().getUserJwt();
    if (jwt) {
      const user_data = new LocalStorage().getUserData();
      // console.log(user_data)
      this.props.userData(JSON.parse(user_data), jwt)

    }
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

export default connect(mapStateToProps, actions)(App)

