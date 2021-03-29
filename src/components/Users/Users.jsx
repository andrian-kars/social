import s from './Users.module.css'
import SingleUser from './SingleUser/SingleUser'
import Paginator from '../common/Paginator/Paginator'

const Users = ({ followingInProgress, unfollow, follow, users, onPageChange, 
        pageSize, totalUsersCount, currentPage }) => {
    return (
        <div className={s.whrapper}>
            <Paginator currentPage={currentPage} totalUsersCount={totalUsersCount}
                pageSize={pageSize} onPageChange={onPageChange} />
            {users.map(u => 
                <SingleUser photo={u.photos.small} follow={follow} 
                    unfollow={unfollow} key={u.id} userID={u.id}
                    name={u.name} followed={u.followed} status={u.status}
                    followingInProgress={followingInProgress}
                />
            )}
        </div>
    )
}

export default Users