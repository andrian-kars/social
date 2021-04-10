import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'

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
    // @ts-ignore
    subscribe(observer) {
        this._callSubscriber = observer
    },
    // @ts-ignore
    dispatch(action) {
        // @ts-ignore
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        // @ts-ignore
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        // @ts-ignore
        this._callSubscriber(this._state)
    }
}

export default store