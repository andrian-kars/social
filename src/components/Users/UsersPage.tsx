import s from './Users.module.scss'
import SingleUser from './SingleUser/SingleUser'
import { Paginator } from '../common/Paginator/Paginator'
import UsersSearchForm from './UsersSearchForm'
import { FilterType, requestUsers, follow, unfollow } from '../../redux/usersReducer'
import { getCurrentPage, getDialogs, getFollowingInProgress, getIsFetching, getIsSubFetching, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/usersSelectors'
import { useDispatch, useSelector } from 'react-redux'
import { memo, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import * as queryString from 'querystring'
import { Preloader } from '../common/Preloader/Preloader'
import { startDialog } from '../../redux/dialogsReducer'
import { AppStateType } from '../../redux/redux-store'

export const UsersPage: React.FC = memo(() => {
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)
    const filter = useSelector(getUsersFilter)
    const isFetching = useSelector(getIsFetching)
    const isSubFetching = useSelector(getIsSubFetching)
    
    // to check and change message button
    const dialogs = useSelector(getDialogs)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryType
        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = +parsed.page
        if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }
        switch (parsed.friend) {
            case 'null':
                actualFilter = { ...actualFilter, friend: null }
                break
            case 'true':
                actualFilter = { ...actualFilter, friend: true }
                break
            case 'false':
                actualFilter = { ...actualFilter, friend: false }
                break
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const query: QueryType = {}
        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = '' + filter.friend
        if (currentPage !== 1) query.page = '' + currentPage


        if (history.location.search.substr(1) !== queryString.stringify(query)) {
            history.push({
                pathname: '/users',
                search: queryString.stringify(query)
            })
        }
    }, [history, filter, currentPage])

    const onPageChange = (pageNumber: number) => { dispatch(requestUsers(pageNumber, pageSize, filter)) }
    const onFilterChange = (filter: FilterType) => { dispatch(requestUsers(1, pageSize, filter)) }
    const onFollow = (userId: number) => { dispatch(follow(userId)) }
    const onUnfollow = (userId: number) => { dispatch(unfollow(userId)) }
    const onStartDialog = (userId: number, name: string) => { dispatch(startDialog(userId, name)) }
    const authorazedUserId = useSelector((state: AppStateType) => state.auth.userId)

    return (
        <div className={s.whrapper}>
            {isFetching ? <Preloader />
                : <>
                    <UsersSearchForm onFilterChange={onFilterChange} />
                    <Paginator currentPage={currentPage} totalUsersCount={totalUsersCount}
                        pageSize={pageSize} onPageChange={onPageChange} />
                    {isSubFetching ? <Preloader />
                        : <div className={s.users}>
                            {users.map(u =>
                                <SingleUser onStartDialog={onStartDialog} photo={u.photos} follow={onFollow}
                                    unfollow={onUnfollow} key={u.id} userID={u.id}
                                    name={u.name} followed={u.followed} status={u.status}
                                    followingInProgress={followingInProgress} dialogs={dialogs} authorazedUserId={authorazedUserId}
                                />
                            )}
                        </div>
                    }
                </>
            }
        </div>
    )
})

type QueryType = {
    term?: string
    page?: string
    friend?: string
}