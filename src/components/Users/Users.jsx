import React from 'react'
import s from './Users.module.css'
import SingleUser from './SingleUser/SingleUser'
import * as axios from 'axios'

class Users extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setUsersTotalCount(response.data.totalCount)
        })
    }

    onPageChange = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        const pages = []
        for (let i = this.props.currentPage; i <= pagesCount && i < this.props.currentPage + 5; i++) {
            pages.push(i)
        }

        return (
            <div className={s.whrapper}>
                <div className={s.pagination}>
                    {pages.map(p => { 
                        return <button className={`${this.props.currentPage === p && s.selectedPage} ${s.pages}`}
                            onClick={(e) => { this.onPageChange(p) }}>{p}</button>
                    })}
                </div>
                {
                    this.props.users.map(u => <SingleUser photo={u.photos.small} follow={this.props.follow} unfollow={this.props.unfollow} key={u.id} id={u.id}
                        name={u.name} followed={u.followed} status={u.status} />)
                }
            </div>
        )
    }
}

export default Users