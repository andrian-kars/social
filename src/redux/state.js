import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT'

const store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, likesCount: 69, message: 'Oh, you\'re approuching me?' },
                { id: 2, likesCount: 340, message: 'Dio, you are going down!' },
                { id: 3, likesCount: 420, message: 'It was me, DIO!' }
            ],
            newPostText: ''
        },
        dialogsPage: {
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
    },
    _callSubscriber(){},
    getState(){
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        
        this._callSubscriber(this._state)
    }
}

export const addPostActionCreator = () => {
    return {
        type: ADD_POST
    }
}

export const updateNewPostTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
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

export default store