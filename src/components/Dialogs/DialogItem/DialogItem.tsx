import s from './DialogItem.module.scss'
import { NavLink } from 'react-router-dom'
import { memo } from 'react'

type PropsType = {
    userName: string
    id: number
}

export const DialogItem: React.FC<PropsType> = memo((props) => {
    const path = "/dialogs/" + props.id

    return (
        <div className={s.dialog} id={'' + props.id}>
            <NavLink to={path} className={s.link} activeClassName={s.active}>{props.userName}</NavLink>
        </div>
    )
})