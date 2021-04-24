import { useSelector } from 'react-redux'
import { Preloader } from '../common/Preloader/Preloader'
import { getIsFetching } from '../../redux/usersSelectors'
import { Users } from './Users'
import { memo } from 'react'

export const UsersPage: React.FC = memo(() => {
    const isFetching = useSelector(getIsFetching)
    
    return <>
        {isFetching ? <Preloader /> : null}

        <Users />
    </>
})