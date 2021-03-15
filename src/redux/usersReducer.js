const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

const initialState = {
    users: [
        // { id: 1, followed: true, fullName: 'Ivan F.', status: 'I am a person', location: {city: 'Lviv', country: 'Ukraine'} },
        // { id: 2, followed: true, fullName: 'Taras S.', status: 'I am another person', location: {city: 'Kiev', country: 'Ukraine'} },
        // { id: 3, followed: false, fullName: 'Ivan M.', status: 'I am another person', location: {city: 'Kharkiv', country: 'Ukraine'} },
        // { id: 4, followed: false, fullName: 'Ivan G.', status: 'I am another person', location: {city: 'Ternopil', country: 'Ukraine'} },
    ]
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
                users: [...state.users, ...action.users] }
        default: return state
    }
}

export const followAC = (userID) => ({ type: FOLLOW, userID })
export const unfollowAC = (userID) => ({ type: UNFOLLOW, userID })
export const setUsersAC = (users) => ({ type: SET_USERS, users })

export default usersReducer