import { Field, reduxForm } from 'redux-form'
import s from './Login.module.css'
import { Input } from '../common/FormsControls/FormsControls'
import { required } from '../../utils/validators'
 
const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.form}>
            <div>
                <Field validate={required} placeholder={'Email'} name={'email'} component={Input} />
            </div>
            <div>
                <Field validate={required} placeholder={'Password'} name={'password'} component={Input} type='password' />
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={Input} /> remember me
            </div>
            {props.error && <div className={s.summaryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

export default LoginReduxForm