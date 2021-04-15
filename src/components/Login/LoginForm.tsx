import { InjectedFormProps, reduxForm } from 'redux-form'
import s from './Login.module.scss'
import { createField, Input } from '../common/FormsControls/FormsControls'
import { required } from '../../utils/validators'

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

type LoginFormOwnProps = { captchaUrl: string | null }

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit} className={s.form}>
            {error
                ? <div className={s.summaryError}>{error}</div> 
                : <div className={s.summary}>Enter your email address and password or use free account for test</div>
            }
            <div className={s.textInputWhrapper}>
                <span>Email address</span>
                {createField<LoginFormValuesTypeKeys>('Email', 'email', [required], Input)}
            </div>
            <div className={s.textInputWhrapper}>
                <span>Password</span>
                {createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, { type: 'password'})}
            </div>
            {captchaUrl && <img src={captchaUrl} alt='captcha' />}
            {captchaUrl && <div className={s.textInputWhrapper}>{createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', [required], Input)}</div>}
            <div className={s.checkInputWhrapper}>
                <div>
                    {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, { type: 'checkbox' })}
                    <span>Remember me</span>
                </div>
                <button className={s.btn}>Sign in</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm)

export default LoginReduxForm