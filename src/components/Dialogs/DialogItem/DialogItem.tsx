import s from './DialogItem.module.scss'
import { NavLink } from 'react-router-dom'

type PropsType = {
    name: string
    id: number
    key: number
}

const DialogItem: React.FC<PropsType> = (props) => {
    const path = "/dialogs/" + props.id
    
    return (
        <div className={s.dialog} id={'' + props.id} key={'' + props.key}>
            <NavLink to={path} className={s.link} activeClassName={s.active}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem