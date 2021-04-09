import React, { Suspense } from 'react'
import './App.scss'
import HeaderContainer from './components/Header/HeaderContainer'
import Navigation from './components/Navigation/Navigation'
import ProfileContainer from './components/Profile/ProfileContainer'
import News from './components/News/News'

import UsersContainer from './components/Users/UsersContainer'
// import Footer from './components/Footer/Footer'
import { Route, withRouter, HashRouter, Switch, Redirect } from 'react-router-dom'
import { initializeApp, } from './redux/appReducer'
import { connect, Provider } from 'react-redux'
import { compose } from 'redux'
import Preloader from './components/common/Preloader/Preloader'
import store from './redux/redux-store'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import Login from './components/Login/Login'

const Page404 = React.lazy(() => import('./components/common/Page404/Page404'))

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
              <Route exact path="/" render={() => <Redirect to={'/news'} />} />
              <Route path="/news" render={() => <News />} />
              <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
              <Route path="/dialogs/:userId?" render={() => <DialogsContainer />} />
              <Route exact path="/users" render={() => <UsersContainer />} />
              <Route exact path="*" render={() => <Suspense fallback={<Preloader />}><Page404 /></Suspense>} />
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