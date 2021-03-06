// import { createSelector } from "reselect" 83

import { AppStateType } from "./redux-store"

export const getUsers = (state: AppStateType) => {
    return state.usersPage.users
}

// export const getUserSuper = (state: appStateType) => createSelector(() => {
//     state.usersPage.users.filter(u => true)
// })

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}
export const getIsSubFetching = (state: AppStateType) => {
    return state.usersPage.isSubFetching
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}

export const getUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter
}

export const getDialogs = (state: AppStateType) => {
    return state.dialogsPage.dialogs
}