const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

const initialState = {
    users: [
        // { id: 1, followed: true, fullName: 'Ivan F.', status: 'I am a person', location: {city: 'Lviv', country: 'Ukraine'} },
        // { id: 2, followed: true, fullName: 'Taras S.', status: 'I am another person', location: {city: 'Kiev', country: 'Ukraine'} },
        // { id: 3, followed: false, fullName: 'Ivan M.', status: 'I am another person', location: {city: 'Kharkiv', country: 'Ukraine'} },
        // { id: 4, followed: false, fullName: 'Ivan G.', status: 'I am another person', location: {city: 'Ternopil', country: 'Ukraine'} },
    ],
    pageSize: 6,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userID ? { ...u, followed: true } : u)
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userID ? { ...u, followed: false } : u)
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
        default: return state
    }
}

export const followAC = (userID) => ({ type: FOLLOW, userID })
export const unfollowAC = (userID) => ({ type: UNFOLLOW, userID })
export const setUsersAC = (users) => ({ type: SET_USERS, users })
export const setCurrentPageAC = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setUsersTotalCountAC = (totalUsersCount) => ({ type: SET_USERS_TOTAL_COUNT, totalUsersCount })
export const setIsFetchingAC = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })

export default usersReducer