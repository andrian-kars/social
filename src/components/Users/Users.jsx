import s from './Users.module.css'
import SingleUser from './SingleUser/SingleUser'
import * as axios from 'axios'

const Users = (props) => {
    if (props.users.length === 0) {
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
            props.setUsers(response.data.items)
        })
    }
    const users = props.users.map(u => <SingleUser photo={u.photos.small} follow={props.follow} unfollow={props.unfollow} key={u.id} id={u.id}
        name={u.name} followed={u.followed} status={u.status} />)
    
    return (
        <div className={s.whrapper}>
            {users}
        </div>
    )
}

export default Users