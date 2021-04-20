import s from './Users.module.scss'
import SingleUser from './SingleUser/SingleUser'
import Paginator from '../common/Paginator/Paginator'
import { UserType } from '../../types/types'
import UsersSearchForm from './UsersSearchForm'
import { FilterType } from '../../redux/usersReducer'

type PropsType = {
    followingInProgress: Array<number>
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChange: (pageNumber: number) => void
    onFilterChange: (filter: FilterType) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

const Users: React.FC<PropsType> = ({ followingInProgress, unfollow, follow, users, onPageChange,
    pageSize, totalUsersCount, currentPage, onFilterChange }) => {
    return (
        <div className={s.whrapper}>
            <UsersSearchForm onFilterChange={onFilterChange} />
            <Paginator currentPage={currentPage} totalUsersCount={totalUsersCount}
                pageSize={pageSize} onPageChange={onPageChange} />
            <div className={s.users}>
                {users.map(u =>
                    <SingleUser photo={u.photos} follow={follow}
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