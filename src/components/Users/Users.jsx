import s from './Users.module.css'

const Users = (props) => {
    const users = props.users.map(u => <div className={s.user} key={u.id}>

    </div>)
    return (
        <div className={s.div}>{users}</div>
    )
}

export default Users