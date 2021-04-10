import s from './Users.module.scss'
import SingleUser from './SingleUser/SingleUser'
import Paginator from '../common/Paginator/Paginator'
import { userType } from '../../types/types'

type propsType = {
    followingInProgress: Array<number>
    unfollow: () => void
    follow: () => void
    users: Array<userType>
    onPageChange: () => void
    pageSize: number
    totalUsersCount: number
    currentPage: number
}

const Users: React.FC<propsType> = ({ followingInProgress, unfollow, follow, users, onPageChange,
        pageSize, totalUsersCount, currentPage }) => {
    return (
        <div className={s.whrapper}>
            <Paginator currentPage={currentPage} totalUsersCount={totalUsersCount}
                pageSize={pageSize} onPageChange={onPageChange} />
            <div className={s.users}>
                {users.map(u =>
                    <SingleUser photo={u.photos.small} follow={follow}
                        unfollow={unfollow} key={u.id} userID={u.id}
                        name={u.name} followed={u.followed} status={u.status}
                        followingInProgress={followingInProgress}
                    />
                )}
            </div>
        </div>
    )
}

export default Users