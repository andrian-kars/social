import './App.css'
import Header from './components/Header/Header'
import Navigation from './components/Navigation/Navigation'
import Profile from './components/Profile/Profile'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import Footer from './components/Footer/Footer'
import { Route } from 'react-router-dom'

const App = (props) => {
  return (
      <div className="app-whrapper">
        <div className="container">
          <Header />
          <Navigation />
          <main className="main">
            <Route exact path="/profile" render={() => <Profile />} />
            <Route path="/dialogs" render={() => <DialogsContainer />} />
          </main>
          <Footer />
        </div>
      </div>
  )
}

export default App
