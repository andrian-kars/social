import s from './Users.module.scss'
import SingleUser from './SingleUser/SingleUser'
import Paginator from '../common/Paginator/Paginator'
import UsersSearchForm from './UsersSearchForm'
import { FilterType, requestUsers, follow, unfollow } from '../../redux/usersReducer'
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/usersSelectors'
import { useDispatch, useSelector } from 'react-redux'
import { memo, useEffect } from 'react'

export const Users: React.FC = memo(() => {
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)
    const filter = useSelector(getUsersFilter)

    const dispatch = useDispatch()

    useEffect(() => {
        requestUsers(currentPage, pageSize, filter)
    }, [currentPage, pageSize, filter])

    const onPageChange = (pageNumber: number) => { dispatch(requestUsers(pageNumber, pageSize, filter)) }
    const onFilterChange = (filter: FilterType) => { dispatch(requestUsers(1, pageSize, filter)) }
    const onFollow = (userId: number) => { dispatch(follow(userId)) }
    const onUnfollow = (userId: number) => { dispatch(unfollow(userId)) }

    return (
        <div className={s.whrapper}>
            <UsersSearchForm onFilterChange={onFilterChange} />
            <Paginator currentPage={currentPage} totalUsersCount={totalUsersCount}
                pageSize={pageSize} onPageChange={onPageChange} />
            <div className={s.users}>
                {users.map(u =>
                    <SingleUser photo={u.photos} follow={onFollow}
                        unfollow={onUnfollow} key={u.id} userID={u.id}
                        name={u.name} followed={u.followed} status={u.status}
                        followingInProgress={followingInProgress}
                    />
                )}
            </div>
        </div>
    )
})