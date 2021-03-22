import { Field, reduxForm } from 'redux-form'
import s from './Login.module.css'
 
const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.form}>
            <div>
                <Field placeholder={'Login'} name={'login'} component={'input'} />
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'}  component={'input'} />
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'}  component={'input'} /> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

export default LoginReduxForm