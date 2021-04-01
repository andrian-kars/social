import { Field, reduxForm } from 'redux-form'
import { required, maxLengthCreator } from '../../../utils/validators'
import { Textarea } from '../../common/FormsControls/FormsControls'
import s from './Posts.module.scss'
import userPhoto from './../../../images/user-photo.png'

const maxLength = maxLengthCreator(230)

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.form}>
            <div className={s.formWhrapper}>
                <img className={s.avatar} src={props.avatar === null ? userPhoto : props.avatar} alt="user" />
                <Field className={s.field} validate={[required, maxLength]} component={Textarea} name="newPostBody" placeholder="Write something here..." />
            </div>
            <button className={s.btn}>Post</button>
        </form>
    )
}

const AddPostFormRedux = reduxForm({ form: 'profileAddPostForm' })(AddPostForm)

export default AddPostFormRedux