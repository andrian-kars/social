import { PostType, ProfileType } from "../types/types"
import profileReducer, { addPostActionCreator, deletePost } from "./profileReducer"

const state = {
    profile: null as null | ProfileType,
    posts: [
        { id: 1, likesCount: 69, message: 'Oh, you\'re approuching me?' },
        { id: 2, likesCount: 340, message: 'Dio, you are going down!' },
        { id: 3, likesCount: 420, message: 'It was me, DIO!' }
    ] as Array<PostType>,
    status: '' as string,
    newPostBody: '' as string
}

export type StateType = typeof state

test('length of post should be increamented', () => {
    const action = addPostActionCreator('GG!')

    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(4)
})

test('checking for correct message', () => {
    const action = addPostActionCreator('GG!')

    const newState = profileReducer(state, action)

    expect(newState.posts[3].message).toBe('GG!')
})

test('after deleting length of messages should be decreased', () => {
    const action = deletePost(1)

    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(2)
})