import s from './Header.module.css'
import logo from './../../images/logo.png'
import { NavLink } from 'react-router-dom'

const Header = (props) => {
    return (
        <header id="top" className={s.header}>
            <a href="../../../../../../"><img className={s.logo} src={logo} alt="logo" /></a>

            <div className={s.loginBlock}>
                {props.isAuth ? <p>{props.login}</p> : <NavLink to={'/login'}>Login</NavLink> }
            </div>
        </header>
    )
}

export default Header