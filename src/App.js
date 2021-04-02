import React from 'react'
// import React, { Suspense } from 'react'
import './App.scss'
import HeaderContainer from './components/Header/HeaderContainer'
import Navigation from './components/Navigation/Navigation'
import ProfileContainer from './components/Profile/ProfileContainer'

import UsersContainer from './components/Users/UsersContainer'
// import Footer from './components/Footer/Footer'
import { Route, withRouter, HashRouter } from 'react-router-dom'
import Login from './components/Login/Login'
import { initializeApp, } from './redux/appReducer'
import { connect, Provider } from 'react-redux'
import { compose } from 'redux'
import Preloader from './components/common/Preloader/Preloader'
import store from './redux/redux-store'

import DialogsContainer from './components/Dialogs/DialogsContainer'
// const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className="app-whrapper">
        <HeaderContainer />
        <Navigation show={this.props.menu} />
        <div className="container">
          <main className="main">
            <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
            <Route path="/dialogs/:userId?" render={() => <DialogsContainer />} />
            {/* <Route path="/dialogs" render={() => <Suspense fallback={<Preloader />}><DialogsContainer /></Suspense>} /> */}
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/login" render={() => <Login />} />
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