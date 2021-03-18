import React from 'react'
import Header from './Header'
import * as axios from 'axios'
import { connect } from 'react-redux'
import { setAuthUserData, setIsFetching } from './../../redux/authReducer'
import Preloader from '../common/Preloader/Preloader'

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.setIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                this.props.setIsFetching(false)
                if (response.data.resultCode === 0) {
                    const { id, email, login } = response.data.data
                    this.props.setAuthUserData(id, email, login)
                }
            })
    }

    render () {
        return <>
            { this.props.isFetching ? <Preloader /> : null }
            <Header {...this.props} />
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        isFetching: state.auth.isFetching,
    }
}

export default connect(mapStateToProps, { setAuthUserData, setIsFetching })(HeaderContainer)