import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'

const Dialogs = (props) => {
    // let dialogsElements =
    //     props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id} />)
    // let messagesElements =
    //     props.dialogsPage.messages.map(m => <Message message={m.message} id={m.id} />)

    // let newMessageElement = React.createRef()

    // let addNewMessage = () => {
    //     props.addNewMessage()
    // }

    // let onMessageChange = () => {
    //     let text = newMessageElement.current.value
    //     props.onMessageChange(text)
    // }

    return (
        <div className={s.whrapper}>
            <div className={s.dialogs}>
                {/* {dialogsElements} */}
                <DialogItem />
            </div>
            <div className={s.messages}>
                <div className={s.messages_whrapper}>
                    {/* {messagesElements} */}
                    <Message />
                </div>
                <form className={s.new_message}>
                    {/* <textarea className={s.textarea} onChange={onMessageChange}
                        ref={newMessageElement} value={props.dialogsPage.newMessageText}
                        name="text" placeholder="Message..." /> */}
                    <textarea className={s.textarea}

                        name="text" placeholder="Message..." />
                    <input className={s.input} type="button" value="Send" />
                </form>
            </div>
        </div>
    )
}

export default Dialogs