import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { logout, } from './../../redux/authReducer'
import { getProfile, } from './../../redux/profileReducer'
import { showMenu, } from './../../redux/appReducer'
import { compose } from 'redux'

class HeaderContainer extends React.Component {
    render () {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    menu: state.app.menu,
})

export default compose(connect(mapStateToProps, { logout, getProfile, showMenu }))(HeaderContainer)