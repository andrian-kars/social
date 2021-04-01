import s from './Dialogs.module.scss'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import AddMessageFormRedux from './AddMessageForm'

const Dialogs = (props) => {
    const dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem id={d.id} key={d.id} name={d.name} />)
    const messagesElements = props.dialogsPage.messages.map(m => <Message id={m.id} key={m.id} message={m.message} />)
    const addNewMessage = (FormData) => props.onAddMessage(FormData.newMessageBody)
    return (
        <div className={s.whrapper}>
            <div className={s.dialogs}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div className={s.messagesWhrapper}>
                    {messagesElements}
                </div>
                <div className={s.newMessageWhrapper}>
                    <AddMessageFormRedux onSubmit={addNewMessage} />
                </div>
            </div>
        </div>
    )
}

export default Dialogs