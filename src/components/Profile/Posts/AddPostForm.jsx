import { Field, reduxForm } from 'redux-form'
import { required, maxLengthCreator } from '../../../utils/validators'
import { Textarea } from '../../common/FormsControls/FormsControls'
import s from './Posts.module.css'

const maxLength = maxLengthCreator(250)

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.form}>
            <Field validate={[required, maxLength]} component={Textarea} name="newPostBody" placeholder="Your news..." />
            <button className={s.input}>Send</button>
        </form>
    )
}

const AddPostFormRedux = reduxForm({ form: 'profileAddPostForm' })(AddPostForm)

export default AddPostFormRedux