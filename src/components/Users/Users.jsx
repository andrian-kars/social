import s from './Users.module.css'
import SingleUser from './SingleUser/SingleUser'

const Users = (props) => {
    // if (props.users.length === 0) {
    //     props.setUsers([
    //         { id: 1, followed: true, fullName: 'Ivan F.', status: 'I am a person', location: {city: 'Lviv', country: 'Ukraine'} },
    //         { id: 2, followed: true, fullName: 'Taras S.', status: 'I am another person', location: {city: 'Kiev', country: 'Ukraine'} },
    //         { id: 3, followed: false, fullName: 'Ivan M.', status: 'I am another person', location: {city: 'Kharkiv', country: 'Ukraine'} },
    //         { id: 4, followed: false, fullName: 'Ivan G.', status: 'I am another person', location: {city: 'Ternopil', country: 'Ukraine'} },
    //     ])
    // }
    const users = props.users.map(u => <SingleUser follow={props.follow} unfollow={props.unfollow} key={u.id} id={u.id}
        fullName={u.fullName} followed={u.followed} status={u.status} location={u.location} />)
    
    return (
        <div className={s.whrapper}>
            {users}
        </div>
    )
}

export default Users