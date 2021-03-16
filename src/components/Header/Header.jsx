import s from './Header.module.css'
import logo from './../../images/logo.png'

const Header = () => {
    return (
        <header id="top" className={s.header}>
            <a href="../../../../../../"><img className={s.logo} src={logo} alt="logo" /></a>
        </header>
    )
}

export default Header