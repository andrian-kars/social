// import { createSelector } from "reselect" 83

import { appStateType } from "./redux-store"

export const getUsers = (state: appStateType) => {
    return state.usersPage.users
}

// export const getUserSuper = (state: appStateType) => createSelector(() => {
//     state.usersPage.users.filter(u => true)
// })

export const getPageSize = (state: appStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: appStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: appStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: appStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: appStateType) => {
    return state.usersPage.followingInProgress
}