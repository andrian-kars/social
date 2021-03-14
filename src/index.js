import React from 'react'
import reportWebVitals from './reportWebVitals'
import store from './redux/redux-store'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import StoreContext from './context'

const rerenderEntireTree = () => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <StoreContext.Provider value={store}>
            <App />
          </StoreContext.Provider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

rerenderEntireTree(store.getState())

store.subscribe( () => {
  const state = store.getState()
  rerenderEntireTree(state)
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
