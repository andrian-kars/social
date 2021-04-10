import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'
import usersReducer from './usersReducer'
import authReducer from './authReducer'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from './appReducer'

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

type rootReducerType = typeof rootReducer // (globalstate: GLOBALSTATE) => GLOBALSTATE
export type appStateType = ReturnType<rootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// const store = createStore(rootReducer, applyMiddleware(thunk))

export default store