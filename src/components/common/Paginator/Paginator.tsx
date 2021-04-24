// import { memo } from 'react'
import s from './Paginator.module.scss'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChange: (pageNumber: number) => void
}

export const Paginator: React.FC<PropsType> = ({ totalUsersCount, pageSize = 10, currentPage = 1, onPageChange } ) => {
    const maxPages: number = 5

    // calculate total pages
    let totalPages = Math.ceil(totalUsersCount / pageSize)

    // ensure current page isn't out of range
    if (currentPage < 1) {
        currentPage = 1
    } else if (currentPage > totalPages) {
        currentPage = totalPages
    }

    let startPage: number, endPage: number
    if (totalPages <= maxPages) {
        // total pages less than max so show all pages
        startPage = 1
        endPage = totalPages
    } else {
        // total pages more than max so calculate start and end pages
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2)
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1
        if (currentPage <= maxPagesBeforeCurrentPage) {
            // current page near the start
            startPage = 1
            endPage = maxPages
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            // current page near the end
            startPage = totalPages - maxPages + 1
            endPage = totalPages
        } else {
            // current page somewhere in the middle
            startPage = currentPage - maxPagesBeforeCurrentPage
            endPage = currentPage + maxPagesAfterCurrentPage
        }
    }

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i)


    return <div className={s.pagination}>
        <button title={'First'} className={s.indexes} onClick={() => { onPageChange(1) }}>
            <svg viewBox="0 0 20 20">
                <path d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
            </svg>
        </button>
        {pages.map(p => {
            return <button key={p} className={`${currentPage === p && s.selectedPage} ${s.pages}`}
            onClick={() => { onPageChange(p) }}>{p}</button>
        })}
        <button title={'Last'} className={s.indexes} onClick={() => { onPageChange(totalPages) }}>
            <svg viewBox="0 0 20 20">
                <path d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
            </svg>
        </button>
    </div>
}