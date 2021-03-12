import s from './DialogItem.module.css'
// import { NavLink } from 'react-router-dom'

const DialogItem = (props) => {
    return (
        <div className={s.dialog}>
            <a className={s.link} activeClassName={s.active}>Ivan</a>
        </div>
    )
}

export default DialogItem