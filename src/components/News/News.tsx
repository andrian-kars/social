import s from './News.module.scss'
import { memo } from 'react'

export const News: React.FC = memo(() => {
    return (
        <div className={s.news}>
            <div className={s.item}>
                <p>TBD</p>
            </div>
            <div className={s.item}>
                <p>TBD</p>
            </div>
            <div className={s.item}>
                <p>TBD</p>
            </div>
        </div>
    )
})