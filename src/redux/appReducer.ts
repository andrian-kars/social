import { getAuthUserData } from "./authReducer"
import { InferActionsTypes } from "./redux-store"

const initialState = {
    initialized: false as boolean,
    menu: true as boolean
}

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'S/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true,
            }
        case 'S/APP/SHOW_MENU':
            return {
                ...state,
                menu: action.menu
            }
        default: return state
    }
}

export const actions = {
    initializedSuccess: () => ({ type: 'S/APP/INITIALIZED_SUCCESS' } as const),
    showMenu: (menu: boolean) => ({ type: 'S/APP/SHOW_MENU', menu } as const)
}

export const initializeApp = () => (dispatch: any) => {
    const promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccess())
    })
}

export default appReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>