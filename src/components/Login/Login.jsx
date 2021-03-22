import s from './Login.module.css'
import LoginReduxForm from './LoginFrom'

const Login = (props) => {
    const onSubmit = (FormData) => {
        console.log(FormData);
    }
    return (
        <div>
            <h1 className={s.heading}>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

export default Login