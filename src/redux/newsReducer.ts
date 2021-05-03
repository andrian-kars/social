import { InferActionsTypes } from "./redux-store"

const initialState = {
    news: [
        {
            id: 1,
            hidden: false,
            heading: 'Update 1',
            content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.'
        },
        {
            id: 2,
            hidden: true,
            heading: 'Update 2',
            content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.'
        },
        {
            id: 3,
            hidden: true,
            heading: 'Update 69',
            content: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.'
        },
    ]
}

const newsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'S/APP/SHOW':
            return {
                ...state,
                news: [...state.news].map(n => {
                    if(n.id === action.id) {
                        n.hidden = !n.hidden
                    } else {
                        n.hidden = true
                    }
                    return n
                }),
            }
        default: return state
    }
}

export const actions = {
    show: (id: number) => ({ type: 'S/APP/SHOW', id } as const)
}

export default newsReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>