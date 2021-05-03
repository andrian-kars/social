import { InjectedFormProps, reduxForm } from 'redux-form'
import { required, maxLengthCreator } from '../../../utils/validators'
import { createField, GetStringKeys, Textarea } from '../../common/FormsControls/FormsControls'
import s from './Posts.module.scss'
import userPhoto from './../../../images/user-photo.png'
import { memo } from 'react'

const maxLength = maxLengthCreator(230)

export type AddPostFormValuesType = {
    newPostBody: string
}

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

type PropsType = {
    avatar: string | null
}

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = memo((props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.form}>
            <div className={s.formWhrapper}>
                <img className={s.avatar} src={props.avatar === null ? userPhoto : props.avatar} alt="user" />
                {createField<AddPostFormValuesTypeKeys>('Write something here...', 'newPostBody', [required, maxLength], Textarea, { maxLength: '231' })}
            </div>
            <button className={s.btn}>Post</button>
        </form>
    )
})

export const AddPostFormRedux = reduxForm<AddPostFormValuesType, PropsType>({ form: 'profileAddPostForm' })(AddPostForm)