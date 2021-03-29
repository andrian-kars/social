import s from './Paginator.module.css'

const Paginator = ({ totalUsersCount, pageSize, currentPage, onPageChange }) => {
    const pagesCount = Math.ceil(totalUsersCount / pageSize)
    const pages = []
    for (let i = currentPage; i <= pagesCount && i < currentPage + 5; i++) {
        pages.push(i)
    }

    return (
        <div className={s.pagination}>
            {pages.map(p => {
                return <button className={`${currentPage === p && s.selectedPage} ${s.pages}`}
                    onClick={(e) => { onPageChange(p) }}>{p}</button>
            })}
        </div>
    )
}

export default Paginator