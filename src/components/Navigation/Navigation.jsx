import s from './Navigation.module.css'

const Navigation = () => {
    return (
        <nav className={s.navigation}>
            <ul className={s.whrapper}>
                <li className={s.item}>
                    <a className={s.link} activeClassName={s.active} to="/brainbook/profile">Profile</a>
                </li>
                <li className={s.item}>
                    <a className={s.link} activeClassName={s.active} to="/brainbook/dialogs">Messages</a>
                </li>
                <li className={s.item}>
                    <a className={s.link} activeClassName={s.active} to="/brainbook/news">News</a>
                </li>
                <li className={s.item}>
                    <a className={s.link} activeClassName={s.active} to="/brainbook/music">Music</a>
                </li>
                <li className={s.item}>
                    <a className={s.link} activeClassName={s.active} to="/brainbook/settings">Settings</a>
                </li>
            </ul>
        </nav>
    )
}
export default Navigation