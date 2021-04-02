import { getAuthUserData } from "./authReducer"

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'
const SHOW_MENU = 'SHOW_MENU'

const initialState = {
    initialized: false,
    menu: true
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        case SHOW_MENU:
            return {
                ...state,
                menu: action.menu
            }
        default: return state
    }
}

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS })
export const showMenu = menu => ({ type: SHOW_MENU, menu })

export const initializeApp = () => dispatch => {
    const promise = dispatch(getAuthUserData())
    // const promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess())
    })
}

export default appReducer