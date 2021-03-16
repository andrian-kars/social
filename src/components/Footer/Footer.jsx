import s from './Footer.module.css'
import logo from './../../images/logo.png'

const Footer = () => {
    return (
        <footer className={s.footer}>
            <p className={s.copyright}>Copyright 2021</p>
            <a href="../../../../../../"><img className={s.logo} src={logo} alt="logo" /></a>
        </footer>
    )
}

export default Footer