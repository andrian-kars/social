import s from './Footer.module.scss'
import logo from './../../images/logo.png'

export const Footer: React.FC = () => {
    return (
        <footer className={s.footer}>
            <p className={s.copyright}>Copyright 2021</p>
            <a href="../../../../../../"><img className={s.logo} src={logo} alt="logo" /></a>
        </footer>
    )
}