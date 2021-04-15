import { FormAction, stopSubmit } from "redux-form"
import { ResultCodesEnum } from "../api/api"
import { profileAPI } from "../api/profileAPI"
import { PhotosType, PostType, ProfileType } from "../types/types"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

const initialState = {
    profile: null as null | ProfileType,
    posts: [
        { id: 1, likesCount: 69, message: 'Oh, you\'re approuching me?' },
        { id: 2, likesCount: 340, message: 'Dio, you are going down!' },
        { id: 3, likesCount: 420, message: 'It was me, DIO!' }
    ] as Array<PostType>,
    status: '' as string,
    newPostBody: '' as string
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'S/PROFILE/ADD_POST':
            return {
                ...state,
                posts: [...state.posts, { id: 5, likesCount: 0, message: action.newPostBody }],
                newPostBody: ''
            }
        case 'S/PROFILE/SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'S/PROFILE/SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'S/PROFILE/DELETE_POST': {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case 'S/PROFILE/SAVE_PHOTO_SUCCESS': {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        }
        default: return state
    }
}

export const actions = {
    addPostActionCreator: (newPostBody: string) => ({ type: 'S/PROFILE/ADD_POST', newPostBody } as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'S/PROFILE/SET_USER_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'S/PROFILE/SET_STATUS', status } as const),
    deletePost: (postId: number) => ({ type: 'S/PROFILE/DELETE_POST', postId } as const),
    setPhotoSuccess: (photos: PhotosType) => ({ type: 'S/PROFILE/SAVE_PHOTO_SUCCESS', photos } as const)
}

export const getProfile = (userId: number): ThunkType => async (dispatch) => {
    const profileData = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(profileData))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const statusData = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(statusData))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const statusData = await profileAPI.updateStatus(status)
    if (statusData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setStatus(status))
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const photoData = await profileAPI.savePhoto(file)
    if (photoData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setPhotoSuccess(photoData.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const profileData = await profileAPI.saveProfile(profile)
    if (profileData.resultCode === ResultCodesEnum.Success) {
        if (userId !== null) {
            dispatch(getProfile(userId))
        } else {
            throw new Error('User ID can\'t bu null')
        }
    } else {
        dispatch(stopSubmit('editProfile', { _error: profileData.messages[0] }))
        return Promise.reject(profileData.messages[0])
    }
}

export default profileReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>