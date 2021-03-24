import { Field, reduxForm } from 'redux-form'
import s from './Login.module.css'
import { Input } from '../common/FormsControls/FormsControls'
import { required } from '../../utils/validators'
 
const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.form}>
            <div>
                <Field validate={required} placeholder={'Login'} name={'login'} component={Input} />
            </div>
            <div>
                <Field validate={required} placeholder={'Password'} name={'password'} component={Input} />
            </div>
            <div>
                <Field validate={required} type={'checkbox'} name={'rememberMe'} component={Input} /> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

export default LoginReduxForm