import { BaseThunkType, InferActionsTypes } from "./redux-store"
import { dialogsAPI } from './../api/dialogsAPI'
import { DialogType, MessageType } from "../types/types"
import { ResultCodesEnum } from "../api/api"

const initialState = {
    dialogs: [] as Array<DialogType>,
    messages: [] as Array<MessageType>,
    isFetching: false,
    isSubFetching: false
}

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        // Helpers
        case 'S/DIALOGS/SET_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching,
            }
        } case 'S/DIALOGS/SET_SUB_IS_FETCHING': {
            return {
                ...state,
                isSubFetching: action.isSubFetching,
            }
        }
        // Main
        case 'S/DIALOGS/SAVE_DIALOGS': {
            return {
                ...state,
                dialogs: action.dialogs,
            }
        }
        case 'S/DIALOGS/SAVE_MESSAGES': {
            return {
                ...state,
                messages: action.messages,
            }
        }
        case 'S/DIALOGS/START_DIALOG': {
            return {
                ...state,
                dialogs: [...state.dialogs, action.payload],
            }
        }
        case 'S/DIALOGS/SEND_MESSAGE': {
            return {
                ...state,
                messages: [...state.messages, action.message],
            }
        }
        default: return state
    }
}

export const actions = {
    // Helpers
    setIsFetching: (isFetching: boolean) => ({ type: 'S/DIALOGS/SET_IS_FETCHING', isFetching} as const),
    setIsSubFetching: (isSubFetching: boolean) => ({ type: 'S/DIALOGS/SET_SUB_IS_FETCHING', isSubFetching} as const),
    // Main
    setDialog: (useId: number, userName: string) => ({ type: 'S/DIALOGS/START_DIALOG', payload: { id: useId, userName: userName} } as const),
    saveDialogs: (dialogs: Array<DialogType>) => ({ type: 'S/DIALOGS/SAVE_DIALOGS', dialogs } as const),
    saveMessages: (messages: Array<MessageType>) => ({ type: 'S/DIALOGS/SAVE_MESSAGES', messages } as const),
    sendMessage: (message: MessageType) => ({ type: 'S/DIALOGS/SEND_MESSAGE', message } as const),
}

export const saveDialogs = (): ThunkType => async (dispatch) => {
    dispatch(actions.setIsFetching(true))
    const dialogs: any = await dialogsAPI.getDialogs()
    dispatch(actions.setIsFetching(false))
    dispatch(actions.saveDialogs(dialogs))
}

export const startDialog = (useId: number, userName: string): ThunkType => async (dispatch) => {
    const dialogData: any = await dialogsAPI.startDialog(useId)
    if (dialogData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setDialog(useId, userName))
    }
}

export const saveMessages = (useId: number): ThunkType => async (dispatch) => {
    dispatch(actions.setIsSubFetching(true))
    const dialogData: any = await dialogsAPI.getMessages(useId)
    dispatch(actions.setIsSubFetching(false))
    dispatch(actions.saveMessages(dialogData.items))
    
}

export const sendMessage = (useId: number, body: string): ThunkType => async (dispatch) => {
    // dispatch(actions.setIsSubFetching(true))
    const dialogData: any = await dialogsAPI.sendMessage(useId, body)
    // dispatch(actions.setIsSubFetching(false))
    if (dialogData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.sendMessage(dialogData.data.message))
    }
}

export default dialogsReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>