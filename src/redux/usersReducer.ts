import { Dispatch } from "react"
import { usersAPI } from "../api/usersAPI"
import { UserType } from "../types/types"
import { updateObjectInArray } from "../utils/objectHelpers"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 12 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number>, // array of user id
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'S/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', { followed: true })
            }
        case 'S/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', { followed: false })
            }
        case 'S/USERS/SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'S/USERS/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'S/USERS/SET_FILTER':
            return {
                ...state,
                filter: action.payload
            }
        case 'S/USERS/SET_USERS_TOTAL_COUNT':
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case 'S/USERS/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'S/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default: return state
    }
}

export const actions = {
    followSuccess: (userID: number) => ({ type: 'S/USERS/FOLLOW', userID } as const),
    unfollowSuccess: (userID: number) => ({ type: 'S/USERS/UNFOLLOW', userID } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'S/USERS/SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'S/USERS/SET_CURRENT_PAGE', currentPage } as const),
    setFilter: (filter: FilterType) => ({ type: 'S/USERS/SET_FILTER', payload: filter } as const),
    setUsersTotalCount: (totalUsersCount: number) => ({ type: 'S/USERS/SET_USERS_TOTAL_COUNT', totalUsersCount } as const),
    setIsFetching: (isFetching: boolean) => ({ type: 'S/USERS/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'S/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
}

export const requestUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setCurrentPage(currentPage))
        dispatch(actions.setFilter(filter))

        const usersData = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
        dispatch(actions.setIsFetching(false))
        dispatch(actions.setUsers(usersData.items))
        dispatch(actions.setUsersTotalCount(usersData.totalCount))
    }
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsType>, userID: number, apiMethod: any,
    actionCreator: (userID: number) => ActionsType) => {

    dispatch(actions.toggleFollowingProgress(true, userID))
    const flowData = await apiMethod(userID)
    if (flowData.resultCode === 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(actions.toggleFollowingProgress(false, userID))
}

export const follow = (userID: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userID, usersAPI.postFollow.bind(usersAPI), actions.followSuccess)
    }
}

export const unfollow = (userID: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userID, usersAPI.deleteFollow.bind(usersAPI), actions.unfollowSuccess)
    }
}

export default usersReducer

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>