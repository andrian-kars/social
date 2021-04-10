// import { Dispatch } from "react"
// import { ThunkAction } from "redux-thunk"
import { getAuthUserData } from "./authReducer"
// import { AppStateType } from "./redux-store"

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'
const SHOW_MENU = 'SHOW_MENU'

const initialState = {
    initialized: false as boolean,
    menu: true as boolean
}

export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
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

type ActionsType = InitializedSuccessActionType | ShowMenuActionType

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = (): InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })
type ShowMenuActionType = {
    type: typeof SHOW_MENU,
    menu: boolean
}
export const showMenu = (menu: boolean): ShowMenuActionType => ({ type: SHOW_MENU, menu })

// type DispatchType = Dispatch<ActionsType>
// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const initializeApp = () => (dispatch: any) => {
    const promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess())
    })
}

export default appReducer