import { reduxForm } from 'redux-form'
import s from './Login.module.scss'
import { createField, Input } from '../common/FormsControls/FormsControls'
import { required } from '../../utils/validators'
 
const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit} className={s.form}>
            {error && <div className={s.summaryError}>{error}</div>}
            <div className={s.textInputWhrapper}>
                {createField('Email', 'email', [required], Input)}
            </div>
            <div className={s.textInputWhrapper}>
                {createField('Password', 'password', [required], Input, { type: 'password'})}
            </div>
            <div className={s.checkInputWhrapper}>
                {createField(null, 'rememberMe', [], Input, { type: 'checkbox' })}
                <span>Remember me</span>
            </div>
            {captchaUrl && <img src={captchaUrl} alt='captcha' />}
            {captchaUrl && <div className={s.textInputWhrapper}>{createField('Symbols from image', 'captcha', [required], Input)}</div>}
            <div className={s.btnWhrapper}>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

export default LoginReduxForm