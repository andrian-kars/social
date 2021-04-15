import React from 'react'
import { requestUsers, follow, unfollow } from '../../redux/usersReducer'
import { connect } from 'react-redux'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import { compose } from 'redux'
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/usersSelectors'
import { UserType } from '../../types/types'
import { AppStateType } from '../../redux/redux-store'

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    totalUsersCount: number
    isFetching: boolean
    users: Array<UserType>
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

type OwnPropsType = {

}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContaier extends React.Component<PropsType> {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChange = (pageNumber : number): void => {
        this.props.requestUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
                {this.props.isFetching ? <Preloader /> : null }
                
                <Users onPageChange={this.onPageChange}  
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage} 
                    users={this.props.users} 
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
    }
}

// const UsersContaier1 = ({ requestUsers, currentPage, pageSize, ...props }) => {
//     useEffect(() => {
//     console.log('DidMount'); // to update
//         requestUsers(currentPage, pageSize)
//     }, [requestUsers, currentPage, pageSize])

//     const onPageChange = pageNumber => {
//         requestUsers(pageNumber, pageSize)
//     }

//     return (
//         <>
//             {props.isFetching ? <Preloader /> : null}
//             <Users onPageChange={onPageChange}
//                 totalUsersCount={props.totalUsersCount}
//                 pageSize={pageSize}
//                 currentPage={currentPage}
//                 users={props.users}
//                 follow={props.follow}
//                 unfollow={props.unfollow}
//                 followingInProgress={props.followingInProgress}
//             />
//         </>
//     )
// }

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { requestUsers, unfollow, follow })
)(UsersContaier)