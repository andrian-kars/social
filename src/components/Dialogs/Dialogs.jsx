import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { Redirect } from 'react-router'

const Dialogs = (props) => {
    const dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem id={d.id} key={d.id} name={d.name} />)
    const messagesElements = props.dialogsPage.messages.map(m => <Message id={m.id} key={m.id} message={m.message} />)
    const newMessageElement = React.createRef()

    const addNewMessage = () => {
        props.onAddMessage()
    }

    const onMessageChange = () => {
        let text = newMessageElement.current.value
        props.onMessageChange(text)
    }

    if (!props.isAuth) {
        return <Redirect to={'/login'} />
    }

    return (
        <div className={s.whrapper}>
            <div className={s.dialogs}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div className={s.messages_whrapper}>
                    {messagesElements}
                </div>
                <form className={s.new_message}>
                    <textarea className={s.textarea} onChange={onMessageChange} ref={newMessageElement} value={props.dialogsPage.newMessageText} name="text" placeholder="Message..." />
                    <input className={s.input} onClick={addNewMessage} type="button" value="Send" />
                </form>
            </div>
        </div>
    )
}

export default Dialogs