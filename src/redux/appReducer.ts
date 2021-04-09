import { getAuthUserData } from "./authReducer"

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'
const SHOW_MENU = 'SHOW_MENU'

const initialState = {
    initialized: false as boolean,
    menu: true as boolean
}

export type initialStateType = typeof initialState

const appReducer = (state = initialState, action: any): initialStateType => {
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

type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = (): initializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })
type showMenuActionType = {
    type: typeof SHOW_MENU,
    menu: boolean
}
export const showMenu = (menu: boolean): showMenuActionType => ({ type: SHOW_MENU, menu })

export const initializeApp = () => (dispatch: any) => {
    const promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess())
    })
}

export default appReducer