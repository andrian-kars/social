import { usersAPI } from "../api/api"
import { userType } from "../types/types"
import { updateObjectInArray } from "../utils/objectHelpers"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

const initialState = {
    users: [] as Array<userType>,
    pageSize: 12 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number> // array of users id
}

export type initialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): initialStateType => {
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

type followSuccessActionType = {
    type: typeof FOLLOW
    userID: number
}
export const followSuccess = (userID: number): followSuccessActionType => ({ type: FOLLOW, userID })
type unfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userID: number
}
export const unfollowSuccess = (userID: number): unfollowSuccessActionType => ({ type: UNFOLLOW, userID })
type setUsersActionType = {
    type: typeof SET_USERS
    users: Array<userType>
}
export const setUsers = (users: Array<userType>): setUsersActionType => ({ type: SET_USERS, users })
type setCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage })
type setUsersTotalCountActionType = {
    type: typeof SET_USERS_TOTAL_COUNT
    totalUsersCount: number
}
export const setUsersTotalCount = (totalUsersCount: number): setUsersTotalCountActionType => ({ type: SET_USERS_TOTAL_COUNT, totalUsersCount })
type setIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const setIsFetching = (isFetching: boolean): setIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching })
type toggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): toggleFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

export const requestUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(setIsFetching(true))
    dispatch(setCurrentPage(currentPage))
    const response = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(setIsFetching(false))
    dispatch(setUsers(response.data.items))
    dispatch(setUsersTotalCount(response.data.totalCount))
}

const followUnfollowFlow = async (dispatch: any, userID: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userID))
    const response = await apiMethod(userID)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(toggleFollowingProgress(false, userID))
}

export const follow = (userID: number) => async (dispatch: any) => {
    followUnfollowFlow(dispatch, userID, usersAPI.postFollow.bind(usersAPI), followSuccess)
}

export const unfollow = (userID: number) => async (dispatch: any) => {
    followUnfollowFlow(dispatch, userID, usersAPI.deleteFollow.bind(usersAPI), unfollowSuccess)
}

export default usersReducer