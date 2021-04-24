import { lazy, memo, Suspense, useEffect } from 'react'
import './App.scss'
import { Header } from './components/Header/Header'
import Navigation from './components/Navigation/Navigation'
import { ProfilePage } from './components/Profile/ProfilePage'
import { News } from './components/News/News'
import { UsersPage } from './components/Users/UsersPage'
// import Footer from './components/Footer/Footer'
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'
import { initializeApp } from './redux/appReducer'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { Preloader } from './components/common/Preloader/Preloader'
import store, { AppStateType } from './redux/redux-store'
import { DialogsPage } from './components/Dialogs/DialogsPage'

const Page404 = lazy(() => import('./components/common/Page404/Page404').then(module => ({ default: module.Page404 })))
const LoginPage = lazy(() => import('./components/Login/LoginPage').then(module => ({ default: module.LoginPage })))

const App: React.FC = memo(() => {
  const initialized = useSelector((state: AppStateType) => state.app.initialized)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  const menu = useSelector((state: AppStateType) => state.app.menu)

  const dispatch = useDispatch()

  useEffect(() => {
    const onInitializeApp = () => { dispatch(initializeApp()) }
    onInitializeApp()
  }, [dispatch])

  if (!initialized) {
    return <Preloader />
  }

  if (!isAuth) {
    return <Suspense fallback={<Preloader />}><LoginPage /></Suspense>
  }

  return (
    <div className="app-whrapper">
      <Header />
      <Navigation show={menu} />
      <div className="container">
        <main className="main">
          <Switch>
            <Route exact path="/" render={() => <Redirect to={'/news'} />} />
            <Route path="/news" render={() => <News />} />
            <Route path="/profile/:userId?" render={() => <ProfilePage />} />
            <Route path="/dialogs/:userId?" render={() => <DialogsPage />} />
            <Route exact path="/users" render={() => <UsersPage />} />
            <Route exact path="*" render={() => <Suspense fallback={<Preloader />}><Page404 /></Suspense>} />
          </Switch>
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  )
})

const MainApp: React.FC = () => {
  return <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
}

export default MainApp