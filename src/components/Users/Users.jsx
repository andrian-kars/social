import s from './Users.module.css'
import SingleUser from './SingleUser/SingleUser'

const Users = (props) => {
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    const pages = []
    for (let i = props.currentPage; i <= pagesCount && i < props.currentPage + 5; i++) {
        pages.push(i)
    }

    return (
        <div className={s.whrapper}>
            <div className={s.pagination}>
                {pages.map(p => {
                    return <button className={`${props.currentPage === p && s.selectedPage} ${s.pages}`}
                        onClick={(e) => { props.onPageChange(p) }}>{p}</button>
                })}
            </div>
            {
                props.users.map(u => 
                    <SingleUser photo={u.photos.small} follow={props.follow} unfollow={props.unfollow} key={u.id} id={u.id}
                        name={u.name} followed={u.followed} status={u.status} />)
            }
        </div>
    )
}

export default Users