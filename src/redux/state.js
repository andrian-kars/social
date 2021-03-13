import rerenderEntireTree from './../render'

const state = {
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
}

export const addPost = () => {
    const newPost = {
        id: 5, likesCount: 0, message: state.profilePage.newPostText
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = ''
    rerenderEntireTree(state)
}

export const updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText
    rerenderEntireTree(state)
}

export default state