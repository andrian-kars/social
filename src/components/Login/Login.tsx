import s from './Login.module.scss'
import LoginReduxForm from './LoginFrom'
import { connect } from 'react-redux'
import { login } from './../../redux/authReducer'
import { Redirect } from 'react-router'
import { AppStateType } from '../../redux/redux-store'

type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe?: boolean, captcha?: string) => void
}

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (FormData: any) => {
        debugger;
        props.login(FormData.email, FormData.password, FormData.rememberMe, FormData.captcha)
    }
    const freeAccount = (FormData: any) => {
        props.login('andrian.karsanashvili@gmail.com', 'q12345678')
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return (
        <div className={s.login}>
            <div className={s.circlesContainer}>
                <div className={s.circleSmall}></div>
                <div className={s.circleMedium}></div>
                <div className={s.circleLarge}></div>
                <div className={s.circleXLarge}></div>
                <div className={s.circleXXLarge}></div>
            </div>
            <div className={s.loginWhrapper}>
                <div className={s.loginForm}>
                    <h1 className={s.heading}>Sign in</h1>
                    <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
                    <p>You can login with a test account <span onClick={freeAccount} className={s.test}>here</span></p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { login })(Login)