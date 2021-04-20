import { InferActionsTypes } from "./redux-store"

const initialState = {
    dialogs: [
        { id: 1, name: 'Ivan' },
        { id: 2, name: 'Taras' },
        { id: 3, name: 'Dio' },
        { id: 4, name: 'Jotaro' },
        { id: 5, name: 'Jostar' },
        { id: 6, name: 'JoJo' },
        { id: 7, name: 'Dio' },
        { id: 8, name: 'Jotaro' },
        { id: 9, name: 'Jostar' },
        { id: 10, name: 'JoJo' },
        { id: 11, name: 'Dio' },
        { id: 12, name: 'Jotaro' },
        { id: 13, name: 'Jostar' },
        { id: 14, name: 'JoJo' },
        { id: 15, name: 'Dio' },
        { id: 16, name: 'Jotaro' },
        { id: 17, name: 'Jostar' },
        { id: 18, name: 'JoJo' },
        { id: 19, name: 'Jotaro' },
        { id: 20, name: 'Jostar' },
        { id: 21, name: 'JoJo' },
    ] as Array<{
        id: number
        name: string
    }>,
    messages: [
        { id: 1, message: 'Hello, world!' },
        { id: 2, message: 'Welcome to matrix' },
        { id: 3, message: 'Neo' },
        { id: 4, message: 'Neo' },
        { id: 5, message: 'Hello, world!' },
        { id: 6, message: 'Welcome to matrix' },
        { id: 7, message: 'Neo' },
        { id: 8, message: 'Neo' },
        { id: 9, message: 'Hello, world!' },
        { id: 10, message: 'Welcome to matrix' },
        { id: 11, message: 'Neo' },
        { id: 12, message: 'Neo' },
        { id: 13, message: 'Welcome to matrix' },
    ] as Array<{
        id: number
        message: string
    }>
}

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'S/DIALOGS/ADD-MESSAGE': {
            return {
                ...state,
                messages: [...state.messages, { id: Math.random(), message: action.newMessageBody }],
            }
        }
        default: return state
    }
}

export const actions = {
    addMessage: (newMessageBody: string) => ({ type: 'S/DIALOGS/ADD-MESSAGE', newMessageBody } as const)
}

export default dialogsReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>