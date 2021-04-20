import { InjectedFormProps, reduxForm } from 'redux-form'
import { required, maxLengthCreator } from '../../utils/validators'
import { createField, GetStringKeys, Textarea } from '../common/FormsControls/FormsControls'
import { DialogsFormValuesType } from './DialogsPage'
import s from './Dialogs.module.scss'
import { memo } from 'react'

const maxLength = maxLengthCreator(69)

type DialogsFormValuesTypeKeys = GetStringKeys<DialogsFormValuesType>

type DialogsFormOwnProps = {}

const AddMessageForm: React.FC<InjectedFormProps<DialogsFormValuesType, DialogsFormOwnProps> & DialogsFormOwnProps> = memo((props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.newMessageForm}>
            <div className={s.formWhrapper}>
                {createField<DialogsFormValuesTypeKeys>('Message...', 'newMessageBody', [required, maxLength], Textarea)}
            </div>
            <button className={s.btn}>Send</button>
        </form>
    )
})

export const AddMessageFormRedux = reduxForm<DialogsFormValuesType, DialogsFormOwnProps>({ form: 'dialogAddMessageForm' })(AddMessageForm)