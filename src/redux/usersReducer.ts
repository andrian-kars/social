import { Dispatch } from "react"
import { ThunkAction } from "redux-thunk"
import { usersAPI } from "../api/api"
import { UserType } from "../types/types"
import { updateObjectInArray } from "../utils/objectHelpers"
import { AppStateType, InferActionsTypes } from "./redux-store"

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 12 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number> // array of user id
}

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', { followed: true })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', { followed: false })
            }
        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'SET_USERS_TOTAL_COUNT':
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case 'TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default: return state
    }
}

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
    followSuccess: (userID: number) => ({ type: 'FOLLOW', userID } as const),
    unfollowSuccess: (userID: number) => ({ type: 'UNFOLLOW', userID } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setUsersTotalCount: (totalUsersCount: number) => ({ type: 'SET_USERS_TOTAL_COUNT', totalUsersCount } as const),
    setIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
}

type DispatchType = Dispatch<ActionsType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch: DispatchType) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setCurrentPage(currentPage))
        const response = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(actions.setIsFetching(false))
        dispatch(actions.setUsers(response.data.items))
        dispatch(actions.setUsersTotalCount(response.data.totalCount))
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userID: number, apiMethod: any, 
    actionCreator: (userID: number) => ActionsType) => {

    dispatch(actions.toggleFollowingProgress(true, userID))
    const response = await apiMethod(userID)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(actions.toggleFollowingProgress(false, userID))
}

export const follow = (userID: number): ThunkType => {
    return async (dispatch: DispatchType) => {
        _followUnfollowFlow(dispatch, userID, usersAPI.postFollow.bind(usersAPI), actions.followSuccess)
    }
}

export const unfollow = (userID: number): ThunkType => {
    return async (dispatch: DispatchType) => {
        _followUnfollowFlow(dispatch, userID, usersAPI.deleteFollow.bind(usersAPI), actions.unfollowSuccess)
    }
}

export default usersReducer