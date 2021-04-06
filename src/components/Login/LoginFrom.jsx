import { Field, reduxForm } from 'redux-form'
import s from './Login.module.scss'
import { Input } from '../common/FormsControls/FormsControls'
import { required } from '../../utils/validators'
 
const LoginForm = ({ handleSubmit, error }) => {
    return (
        <form onSubmit={handleSubmit} className={s.form}>
            <div className={s.textInputWhrapper}>
                <Field validate={required} placeholder={'Email'} name={'email'} component={Input} />
            </div>
            <div className={s.textInputWhrapper}>
                <Field validate={required} placeholder={'Password'} name={'password'} component={Input} type={'password'} />
            </div>
            <div className={s.checkInputWhrapper}>
                <Field type={'checkbox'} name={'rememberMe'} component={Input} />
                <span>Remember me</span>
            </div>
            {error && <div className={s.summaryError}>
                {error}
            </div>}
            <div className={s.btnWhrapper}>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

export default LoginReduxForm