import { Field, reduxForm } from 'redux-form'
import s from './Dialogs.module.css'

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.new_message}>
            <Field component="textarea" name="newMessageBody" className={s.textarea}
                placeholder="Message..." />
            <button className={s.input}>Send</button>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm)

export default AddMessageFormRedux