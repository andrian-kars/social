import './App.css'
import Header from './components/Header/Header'
import Navigation from './components/Navigation/Navigation'
import Profile from './components/Profile/Profile'
import Dialogs from './components/Dialogs/Dialogs'
import Footer from './components/Footer/Footer'
import { BrowserRouter, Route } from 'react-router-dom'

const App = (props) => {
  return (
    <BrowserRouter>
      <div className="app-whrapper">
        <div className="container">
          <Header />
          <Navigation />
          <main className="main">
            <Route exact path="/profile" render={() => <Profile profilePage={props.state.profilePage} />} />
            <Route path="/dialogs" render={() => <Dialogs dialogsPage={props.state.dialogsPage} />} />
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
