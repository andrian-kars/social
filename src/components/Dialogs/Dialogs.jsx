import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { addMessageActionCreator, updateNewMessageTextActionCreator } from './../../redux/dialogsReducer'

const Dialogs = (props) => {
    const state = props.store.getState()

    const dialogsElements = state.dialogsPage.dialogs.map(d => <DialogItem id={d.id} name={d.name} />)
    const messagesElements = state.dialogsPage.messages.map(m => <Message id={m.id} message={m.message} />)
    const newMessageElement = React.createRef()

    const addNewMessage = () => {
        props.store.dispatch(addMessageActionCreator())
    }

    const onMessageChange = () => {
        let text = newMessageElement.current.value
        props.store.dispatch(updateNewMessageTextActionCreator(text))
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
                    <textarea className={s.textarea} onChange={onMessageChange} ref={newMessageElement} value={state.dialogsPage.newMessageText} name="text" placeholder="Message..." />
                    <input className={s.input} onClick={addNewMessage} type="button" value="Send" />
                </form>
            </div>
        </div>
    )
}

export default Dialogs