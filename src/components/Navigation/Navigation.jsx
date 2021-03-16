import { NavLink } from 'react-router-dom'
import s from './Navigation.module.css'

const Navigation = () => {
    return (
        <nav className={s.navigation}>
            <ul className={s.whrapper}>
                <li className={s.item}>
                    <NavLink className={s.link} activeClassName={s.active} to="/profile">Profile</NavLink>
                </li>
                <li className={s.item}>
                    <NavLink className={s.link} activeClassName={s.active} to="/dialogs">Messages</NavLink>
                </li>
                <li className={s.item}>
                    <NavLink className={s.link} activeClassName={s.active} to="/users">Users</NavLink>
                </li>
                <li className={s.item}>
                    <NavLink className={s.link} activeClassName={s.active} to="/news">News</NavLink>
                </li>
                <li className={s.item}>
                    <NavLink className={s.link} activeClassName={s.active} to="/music">Music</NavLink>
                </li>
                <li className={s.item}>
                    <NavLink className={s.link} activeClassName={s.active} to="/settings">Settings</NavLink>
                </li>
            </ul>
        </nav>
    )
}
export default Navigation