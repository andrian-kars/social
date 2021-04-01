import s from './DialogItem.module.scss'
import { NavLink } from 'react-router-dom'

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id
    
    return (
        <div className={s.dialog}>
            <NavLink to={path} className={s.link} activeClassName={s.active}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem