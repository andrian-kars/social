import { usersAPI } from "../api/api"
import { updateObjectInArray } from "../utils/objectHelpers"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

const initialState = {
    users: [],
    pageSize: 6,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', { followed: true})
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

export const followSuccess = userID => ({ type: FOLLOW, userID })
export const unfollowSuccess = userID => ({ type: UNFOLLOW, userID })
export const setUsers = users => ({ type: SET_USERS, users })
export const setCurrentPage = currentPage => ({ type: SET_CURRENT_PAGE, currentPage })
export const setUsersTotalCount = totalUsersCount => ({ type: SET_USERS_TOTAL_COUNT, totalUsersCount })
export const setIsFetching = isFetching => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

export const requestUsers = (currentPage, pageSize) => async dispatch => {
    dispatch(setIsFetching(true))
    dispatch(setCurrentPage(currentPage))
    const response = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(setIsFetching(false))
    dispatch(setUsers(response.data.items))
    dispatch(setUsersTotalCount(response.data.totalCount))
}

const followUnfollowFlow = async (dispatch, userID, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userID))
    const response = await apiMethod(userID)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(toggleFollowingProgress(false, userID))
}

export const follow = userID => async dispatch => {
    followUnfollowFlow(dispatch, userID, usersAPI.postFollow.bind(usersAPI), followSuccess)
}

export const unfollow = userID => async dispatch => {
    followUnfollowFlow(dispatch, userID, usersAPI.deleteFollow.bind(usersAPI), unfollowSuccess)
}

export default usersReducer