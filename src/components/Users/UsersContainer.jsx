import React from 'react'
import { follow, unfollow, setUsers, setCurrentPage, setUsersTotalCount, setIsFetching } from './../../redux/usersReducer'
import { connect } from 'react-redux'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import { getUsers } from '../../api/api'

class UsersContaier extends React.Component {
    componentDidMount() {
        this.props.setIsFetching(true)

        getUsers(this.props.currentPage, this.props.pageSize).then(response => {
                this.props.setIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setUsersTotalCount(response.data.totalCount)
            })
    }

    onPageChange = (pageNumber) => {
        this.props.setIsFetching(true)
        this.props.setCurrentPage(pageNumber)

        getUsers(pageNumber, this.props.pageSize).then(response => {
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

export default connect(mapStateToProps, { follow, unfollow, setUsers, setCurrentPage, setUsersTotalCount, setIsFetching })(UsersContaier)