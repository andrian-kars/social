import { Component, lazy, Suspense } from 'react'
import './App.scss'
import { Header } from './components/Header/Header'
import Navigation from './components/Navigation/Navigation'
import ProfileContainer from './components/Profile/ProfileContainer'
import { News } from './components/News/News'
import { UsersPage } from './components/Users/UsersPage'
// import Footer from './components/Footer/Footer'
import { Route, withRouter, HashRouter, Switch, Redirect } from 'react-router-dom'
import { initializeApp } from './redux/appReducer'
import { connect, Provider } from 'react-redux'
import { compose } from 'redux'
import Preloader from './components/common/Preloader/Preloader'
import store, { AppStateType } from './redux/redux-store'
import DialogsContainer from './components/Dialogs/DialogsContainer'

const Page404 = lazy(() => import('./components/common/Page404/Page404'))
const LoginPage = lazy(() => import('./components/Login/LoginPage').then(module => ({ default: module.LoginPage })))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

class App extends Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    if (!this.props.isAuth) {
      return <Suspense fallback={<Preloader />}><LoginPage /></Suspense>
    }
    return (
      <div className="app-whrapper">
        <Header />
        <Navigation show={this.props.menu} />
        <div className="container">
          <main className="main">
            <Switch>
              <Route exact path="/" render={() => <Redirect to={'/news'} />} />
              <Route path="/news" render={() => <News />} />
              <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
              <Route path="/dialogs/:userId?" render={() => <DialogsContainer />} />
              <Route exact path="/users" render={() => <UsersPage />} />
              <Route exact path="*" render={() => <Suspense fallback={<Preloader />}><Page404 /></Suspense>} />
            </Switch>
          </main>
        </div>
        {/* <Footer /> */}
      </div>
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
  menu: state.app.menu,
  isAuth: state.auth.isAuth
})

const AppContainer = compose<React.ComponentType>(
  withRouter, 
  connect(mapStateToProps, { initializeApp }))(App)

const MainApp: React.FC = () => {
  return <HashRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>
}

export default MainApp