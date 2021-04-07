import React from 'react'
import './App.scss'
import HeaderContainer from './components/Header/HeaderContainer'
import Navigation from './components/Navigation/Navigation'
import ProfileContainer from './components/Profile/ProfileContainer'
import News from './components/News/News'

import UsersContainer from './components/Users/UsersContainer'
// import Footer from './components/Footer/Footer'
import { Route, withRouter, HashRouter, Switch } from 'react-router-dom'
import { initializeApp, } from './redux/appReducer'
import { connect, Provider } from 'react-redux'
import { compose } from 'redux'
import Preloader from './components/common/Preloader/Preloader'
import store from './redux/redux-store'

import DialogsContainer from './components/Dialogs/DialogsContainer'
import Login from './components/Login/Login'
// const Login = React.lazy(() => import('./components/Login/Login'))

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    if (!this.props.isAuth) {
      return <Login />
    }
    return (
      <div className="app-whrapper">
        <HeaderContainer />
        <Navigation show={this.props.menu} />
        <div className="container">
          <main className="main">
            <Switch>
              {/* <Redirect from="/" to="/profile" /> */}
              <Route path="/" exact render={() => <News />} />
              <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
              <Route path="/dialogs/:userId?" render={() => <DialogsContainer />} />
              <Route path="/users" render={() => <UsersContainer />} />
              {/* <Route exact path="/login" render={() => <Suspense fallback={<Preloader />}><Login /></Suspense>} /> */}
            </Switch>
          </main>
        </div>
        {/* <Footer /> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  menu: state.app.menu,
  isAuth: state.auth.isAuth
})

const AppContainer = compose(
  withRouter, 
  connect(mapStateToProps, { initializeApp }))(App)

const MainApp = props => {
  return <HashRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>
}

export default MainApp