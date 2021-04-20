import s from './Header.module.scss'
import logo from './../../images/logo.png'
import { NavLink } from 'react-router-dom'
import { Burger } from '../common/Burger/Burger'
import { memo, MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { logout } from '../../redux/authReducer'
import { actions } from '../../redux/appReducer'

export const Header: React.FC = memo(() => {
    const loginName = useSelector((state: AppStateType) => state.auth.login)
    const menu = useSelector((state: AppStateType) => state.app.menu)

    const disaptch = useDispatch()

    const onLogout = () => { disaptch(logout()) }
    const onShowMenu = (menu: boolean) => { disaptch(actions.showMenu(menu)) }

    const toggleShow = (e: MouseEvent<any>) => { e.currentTarget.children[1].classList.toggle(`${s.divShow}`) }
    const toggleMenu = () => onShowMenu(!menu)

    return (
        <header id="top" className={s.header}>
            <div className={s.whrapperLeftHead}>
                <NavLink to={'/'} className={s.whrapperSocial}>
                    <img className={s.logo} src={logo} alt="logo" />
                    <h1 className={s.heading}>Social</h1>
                </NavLink>
                <div onClick={toggleMenu} className={s.burgerWhrapper}>
                    <Burger show={!menu} />
                </div>
            </div>
            <div className={s.loginBlock}>
                <div onClick={toggleShow} className={s.dropDown}>
                    <div className={s.login}>
                        <span>{loginName}</span>
                        <svg viewBox="0 0 20 20">
                            <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
                        </svg>
                    </div>
                    <div className={s.divToShow}>
                        <span className={s.logout} onClick={onLogout}>Logout</span>
                    </div>
                </div>
            </div>
        </header>
    )
})