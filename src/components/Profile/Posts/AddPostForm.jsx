import { Field, reduxForm } from 'redux-form'
import s from './Posts.module.css'

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.form}>
            <Field component="textarea" name="newPostBody" className={s.textarea} placeholder="Your news..." />
            <button className={s.input}>Send</button>
        </form>
    )
}

const AddPostFormRedux = reduxForm({ form: 'profileAddPostForm' })(AddPostForm)

export default AddPostFormRedux