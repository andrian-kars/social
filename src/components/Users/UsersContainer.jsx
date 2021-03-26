import React from 'react'
import { followSuccess, unfollowSuccess, setCurrentPage, toggleFollowingProgress, requestUsers, follow, unfollow } from './../../redux/usersReducer'
import { connect } from 'react-redux'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import { compose } from 'redux'
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect'
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/usersSelectors'

class UsersContaier extends React.Component {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChange = (pageNumber) => {
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
                    followSuccess={this.props.followSuccess}
                    follow={this.props.follow}
                    unfollowSuccess={this.props.unfollowSuccess}
                    unfollow={this.props.unfollow}
                    toggleFollowingProgress={this.props.toggleFollowingProgress}
                    followingInProgress={this.props.followingInProgress}
                />
            </>
    }
}

// const mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }

const mapStateToProps = (state) => {
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
    WithAuthRedirect,
    connect(mapStateToProps, { followSuccess, unfollowSuccess, setCurrentPage, toggleFollowingProgress, requestUsers, follow, unfollow })
)(UsersContaier)