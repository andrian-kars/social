import Header from './Header'
import { connect } from 'react-redux'
import { logout } from '../../redux/authReducer'
import { actions } from '../../redux/appReducer'
import { compose } from 'redux'
import { AppStateType } from '../../redux/redux-store'

const mapStateToProps = (state: AppStateType) => ({
    login: state.auth.login,
    menu: state.app.menu,
})

export default compose(connect(mapStateToProps, { logout, showMenu: actions.showMenu }))(Header)