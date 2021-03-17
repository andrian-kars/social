import React from 'react'
import { follow, unfollow, setUsers, setCurrentPage, setUsersTotalCount, setIsFetching } from './../../redux/usersReducer'
import { connect } from 'react-redux'
import Users from './Users'
import * as axios from 'axios'
import Preloader from '../common/Preloader/Preloader'

class UsersContaier extends React.Component {
    componentDidMount() {
        this.props.setIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setUsersTotalCount(response.data.totalCount)
            })
    }

    onPageChange = (pageNumber) => {
        this.props.setIsFetching(true)
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setIsFetching(false)
                this.props.setUsers(response.data.items)
            })
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
                />
            </>
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userID) => {
//             dispatch(followAC(userID))
//         },
//         unfollow: (userID) => {
//             dispatch(unfollowAC(userID))
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (currentPage) => {
//             dispatch(setCurrentPageAC(currentPage))
//         },
//         setUsersTotalCount: (totalUsersCount) => {
//             dispatch(setUsersTotalCountAC(totalUsersCount))
//         },
//         setIsFetching: (isFetching) => {
//             dispatch(setIsFetchingAC(isFetching))
//         },
//     }
// }

export default connect(mapStateToProps, { follow, unfollow, setUsers, setCurrentPage, setUsersTotalCount, setIsFetching })(UsersContaier)