import s from './DialogItem.module.scss'
import { NavLink } from 'react-router-dom'
import { memo } from 'react'

type PropsType = {
    name: string
    id: number
    key: number
}

export const DialogItem: React.FC<PropsType> = memo((props) => {
    const path = "/dialogs/" + props.id

    return (
        <div className={s.dialog} id={'' + props.id} key={'' + props.key}>
            <NavLink to={path} className={s.link} activeClassName={s.active}>{props.name}</NavLink>
        </div>
    )
})