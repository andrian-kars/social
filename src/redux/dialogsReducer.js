const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT'

const initialState = {
    dialogs: [
        { id: 1, name: 'Ivan' },
        { id: 2, name: 'Taras' },
        { id: 3, name: 'Dio' },
        { id: 4, name: 'Jotaro' },
        { id: 5, name: 'Jostar' },
        { id: 6, name: 'JoJo' }
    ],
    messages: [
        { id: 1, message: 'Hello, world!' },
        { id: 2, message: 'Welcome to matrix' },
        { id: 3, message: 'Neo' }
    ],
    newMessageText: ''
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage = {
                id: 5, message: state.newMessageText
            }
            state.messages.push(newMessage)
            state.newMessageText = ''
            return state
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newText
            return state
        default: return state
    }
}

export const addMessageActionCreator = () => {
    return {
        type: ADD_MESSAGE
    }
}

export const updateNewMessageTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        newText: text
    }
}

export default dialogsReducer