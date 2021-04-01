import { Field, reduxForm } from 'redux-form'
import { required, maxLengthCreator } from '../../utils/validators'
import { Textarea } from '../common/FormsControls/FormsControls'
import s from './Dialogs.module.scss'

const maxLength = maxLengthCreator(69)

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.newMessageForm}>
            <div className={s.formWhrapper}>
                <Field validate={[required, maxLength]} component={Textarea} name="newMessageBody" placeholder="Message..." />
            </div>
            <button className={s.btn}>Send</button>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm)

export default AddMessageFormRedux