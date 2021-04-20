import s from './Login.module.scss'
import LoginReduxForm from './LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './../../redux/authReducer'
import { Redirect } from 'react-router'
import { AppStateType } from '../../redux/redux-store'
import { memo } from 'react'

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

const Login: React.FC = memo(() => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (FormData: LoginFormValuesType) => { dispatch(login(FormData.email, FormData.password, FormData.rememberMe, FormData.captcha)) }
    const onFreeAccount = () => { dispatch(login('andrian.karsanashvili@gmail.com', 'q12345678', false, null)) }
    
    if (isAuth) { return <Redirect to={'/profile'} /> }

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
                    <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
                    <p>You can login with a test account <span onClick={onFreeAccount} className={s.test}>here</span></p>
                </div>
            </div>
        </div>
    )
})

export default Login