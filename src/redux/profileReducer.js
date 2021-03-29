import { profileAPI } from "../api/api"

const ADD_POST = 'ADD_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'

const initialState = {
    profile: null,
    posts: [
        { id: 1, likesCount: 69, message: 'Oh, you\'re approuching me?' },
        { id: 2, likesCount: 340, message: 'Dio, you are going down!' },
        { id: 3, likesCount: 420, message: 'It was me, DIO!' }
    ],
    status: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: 
            return {
                ...state,
                posts: [...state.posts, { id: 5, likesCount: 0, message: action.newPostBody }]
            }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        default: return state
    }
}

export const setUserProfile = profile => ({ type: SET_USER_PROFILE, profile })
export const addPostActionCreator = newPostBody => ({ type: ADD_POST, newPostBody })
export const setStatus = status => ({ type: SET_STATUS, status })
export const deletePost = postId => ({ type: DELETE_POST, postId })

export const getProfile = userId => async dispatch => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getStatus = userId => async dispatch => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = status => async dispatch => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export default profileReducer