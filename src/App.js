import './App.css'
import Header from './components/Header/Header'
import Navigation from './components/Navigation/Navigation'
import Profile from './components/Profile/Profile'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <div className="app-whrapper">
      <div className="container">
        <Header />
        <Navigation />
        <main className="main">
          <Profile />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
