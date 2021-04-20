import { memo } from 'react'
import s from './Paginator.module.scss'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChange: (pageNumber: number) => void
}

export const Paginator: React.FC<PropsType> = memo(({ totalUsersCount, pageSize, currentPage, onPageChange }) => {
    const pagesCount = Math.ceil(totalUsersCount / pageSize)
    const pages: Array<number> = []

    for (let i = currentPage; i <= pagesCount && i < currentPage + 5; i++) {
        pages.push(i)
    }

    return <div className={s.pagination}>
        {pages.map(p => {
            return <button key={p} className={`${currentPage === p && s.selectedPage} ${s.pages}`}
                onClick={(e) => { onPageChange(p) }}>{p}</button>
        })}
    </div>
})