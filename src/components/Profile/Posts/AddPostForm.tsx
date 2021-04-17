import { InjectedFormProps, reduxForm } from 'redux-form'
import { required, maxLengthCreator } from '../../../utils/validators'
import { createField, GetStringKeys, Textarea } from '../../common/FormsControls/FormsControls'
import s from './Posts.module.scss'
import userPhoto from './../../../images/user-photo.png'

const maxLength = maxLengthCreator(230)

type AddPostFormValuesType = {
    newPostBody: string
}

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

type PropsType = {
    handleSubmit: any
    avatar: any
}

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.form}>
            <div className={s.formWhrapper}>
                <img className={s.avatar} src={props.avatar === null ? userPhoto : props.avatar} alt="user" />
                {createField<AddPostFormValuesTypeKeys>('Write something here...', 'newPostBody', [required, maxLength], Textarea)}
            </div>
            <button className={s.btn}>Post</button>
        </form>
    )
}

const AddPostFormRedux = reduxForm<AddPostFormValuesType, PropsType>({ form: 'profileAddPostForm' })(AddPostForm)

export default AddPostFormRedux