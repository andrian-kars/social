import './App.css'
import Header from './components/Header/Header'
import Navigation from './components/Navigation/Navigation'
import ProfileContainer from './components/Profile/ProfileContainer'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import UsersContainer from './components/Users/UsersContainer'
import Footer from './components/Footer/Footer'
import { Route } from 'react-router-dom'

const App = (props) => {
  return (
      <div className="app-whrapper">
        <Header />
          <div className="container">
            <Navigation />
            <main className="main">
              <Route path="/profile/:userId" render={() => <ProfileContainer />} />
              <Route path="/dialogs" render={() => <DialogsContainer />} />
              <Route path="/users" render={() => <UsersContainer />} />
            </main>
          </div>
        <Footer />
      </div>
  )
}

export default App