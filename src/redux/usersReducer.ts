import { Dispatch } from "react"
import { ThunkAction } from "redux-thunk"
import { usersAPI } from "../api/api"
import { UserType } from "../types/types"
import { updateObjectInArray } from "../utils/objectHelpers"
import { AppStateType } from "./redux-store"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 12 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number> // array of users id
}

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', { followed: true })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', { followed: false })
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_USERS_TOTAL_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default: return state
    }
}

type ActionsType = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType |
    SetCurrentPageActionType | SetUsersTotalCountActionType | SetIsFetchingActionType | ToggleFollowingProgressActionType

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userID: number
}
export const followSuccess = (userID: number): FollowSuccessActionType => ({ type: FOLLOW, userID })
type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userID: number
}
export const unfollowSuccess = (userID: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, userID })
type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users })
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage })
type SetUsersTotalCountActionType = {
    type: typeof SET_USERS_TOTAL_COUNT
    totalUsersCount: number
}
export const setUsersTotalCount = (totalUsersCount: number): SetUsersTotalCountActionType => ({ type: SET_USERS_TOTAL_COUNT, totalUsersCount })
type SetIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const setIsFetching = (isFetching: boolean): SetIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching })
type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

type DispatchType = Dispatch<ActionsType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch: DispatchType) => {
        dispatch(setIsFetching(true))
        dispatch(setCurrentPage(currentPage))
        const response = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(setIsFetching(false))
        dispatch(setUsers(response.data.items))
        dispatch(setUsersTotalCount(response.data.totalCount))
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userID: number, apiMethod: any, 
        actionCreator: (userID: number) => FollowSuccessActionType | UnfollowSuccessActionType) => {

    dispatch(toggleFollowingProgress(true, userID))
    const response = await apiMethod(userID)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(toggleFollowingProgress(false, userID))
}

export const follow = (userID: number): ThunkType => {
    return async (dispatch: DispatchType) => {
        _followUnfollowFlow(dispatch, userID, usersAPI.postFollow.bind(usersAPI), followSuccess)
    }
}

export const unfollow = (userID: number): ThunkType => {
    return async (dispatch: DispatchType) => {
        _followUnfollowFlow(dispatch, userID, usersAPI.deleteFollow.bind(usersAPI), unfollowSuccess)
    }
}

export default usersReducer