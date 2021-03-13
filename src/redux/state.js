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
            ]
        }
    },
    _callSubscriber(){},
    getState(){
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },


    addPost() {
        const newPost = {
            id: 5, likesCount: 0, message: this._state.profilePage.newPostText
        }
        this._state.profilePage.posts.push(newPost)
        this._state.profilePage.newPostText = ''
        this._callSubscriber(this._state)
    },
    updateNewPostText(newText) {
        this._state.profilePage.newPostText = newText
        this._callSubscriber(this._state)
    },
    dispatch(action) {
        if (action.type === 'ADD-POST') {
            const newPost = {
                id: 5, likesCount: 0, message: this._state.profilePage.newPostText
            }
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ''
            this._callSubscriber(this._state)
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText
            this._callSubscriber(this._state)
        }
    }
}
export default store