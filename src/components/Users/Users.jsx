import React from 'react'
import s from './Users.module.css'
import SingleUser from './SingleUser/SingleUser'
import * as axios from 'axios'

class Users extends React.Component {
    getUsers = () => {
        if (this.props.users.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
                this.props.setUsers(response.data.items)
            })
        }
    }

    render() {
        return (
            <div className={s.whrapper}>
                <button onClick={this.getUsers} className={s.get_users}>Get Users</button>
                {
                    this.props.users.map(u => <SingleUser photo={u.photos.small} follow={this.props.follow} unfollow={this.props.unfollow} key={u.id} id={u.id}
                        name={u.name} followed={u.followed} status={u.status} />)
                }
            </div>
        )
    }
}

export default Users