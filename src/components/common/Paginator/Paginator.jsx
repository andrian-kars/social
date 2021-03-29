import s from './Paginator.module.css'

const Paginator = (props) => {
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    const pages = []
    for (let i = props.currentPage; i <= pagesCount && i < props.currentPage + 5; i++) {
        pages.push(i)
    }

    return (
        <div className={s.pagination}>
            {pages.map(p => {
                return <button className={`${props.currentPage === p && s.selectedPage} ${s.pages}`}
                    onClick={(e) => { props.onPageChange(p) }}>{p}</button>
            })}
        </div>
    )
}

export default Paginator