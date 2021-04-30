import { BaseThunkType, InferActionsTypes } from "./redux-store"
import { dialogsAPI } from './../api/dialogsAPI'
import { DialogType } from "../types/types"
import { ResultCodesEnum } from "../api/api"

const initialState = {
    dialogs: [
        { id: 1, userName: 'Ivan' },
        { id: 2, userName: 'Taras' },
        { id: 3, userName: 'Dio' },
        { id: 4, userName: 'Jotaro' },
    ] as Array<DialogType>,
    messages: [
        { id: 1, message: 'Hello, world!' },
        { id: 2, message: 'Welcome to matrix' },
        { id: 3, message: 'Neo' },
        { id: 4, message: 'Neo' },
    ] as Array<{
        id: number
        message: string
    }>
}

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'S/DIALOGS/SAVE_DIALOGS': {
            return {
                ...state,
                dialogs: action.dialogs,
            }
        }
        case 'S/DIALOGS/START_DIALOG': {
            return {
                ...state,
                dialogs: [...state.dialogs, action.payload],
            }
        }
        case 'S/DIALOGS/ADD_MESSAGE': {
            return {
                ...state,
                messages: [...state.messages, { id: state.messages.length + 1, message: action.newMessageBody }],
            }
        }
        default: return state
    }
}

export const actions = {
    addMessage: (newMessageBody: string) => ({ type: 'S/DIALOGS/ADD_MESSAGE', newMessageBody } as const),
    setDialog: (useId: number, userName: string) => ({ type: 'S/DIALOGS/START_DIALOG', payload: { id: useId, userName: userName} } as const),
    saveDialogs: (dialogs: Array<DialogType>) => ({ type: 'S/DIALOGS/SAVE_DIALOGS', dialogs } as const),
}

export const saveDialogs = (): ThunkType => async (dispatch) => {
    const dialogs: any = await dialogsAPI.getDialogs()
    dispatch(actions.saveDialogs(dialogs))
}

export const startDialog = (useId: number, userName: string): ThunkType => async (dispatch) => {
    const dialogData: any = await dialogsAPI.startDialog(useId)
    if (dialogData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setDialog(useId, userName))
    }
}

export default dialogsReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>