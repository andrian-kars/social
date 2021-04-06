import s from './Login.module.scss'
import LoginReduxForm from './LoginFrom'
import { connect } from 'react-redux'
import { login } from './../../redux/authReducer'
import { Redirect } from 'react-router'

const Login = (props) => {
    const onSubmit = (FormData) => {
        props.login(FormData.email, FormData.password, FormData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return (
        <div className={s.login}>
            <div className={s.loginWhrapper}>
                <h1 className={s.heading}>Login</h1>
                <LoginReduxForm onSubmit={onSubmit} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, { login })(Login)