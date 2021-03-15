import s from './Users.module.css'
import SingleUser from './SingleUser/SingleUser'

const Users = (props) => {
    const users = props.users.map(u => <SingleUser key={u.id} id={u.id}
        fullName={u.fullName} followed={u.followed} status={u.status} location={u.location} />)
    return (
        <div className={s.whrapper}>
            {users}
        </div>
    )
}

export default Users