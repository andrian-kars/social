import { Field, reduxForm } from 'redux-form'
import { required, maxLengthCreator } from '../../utils/validators'
import { Textarea } from '../common/FormsControls/FormsControls'
import s from './Dialogs.module.css'

const maxLength = maxLengthCreator(69)

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.new_message}>
            <Field validate={[required, maxLength]} component={Textarea} name="newMessageBody" placeholder="Message..." />
            <button className={s.input}>Send</button>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm)

export default AddMessageFormRedux