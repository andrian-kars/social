import s from './Dialogs.module.scss'
import { DialogItem } from './DialogItem/DialogItem'
import { Message } from './Message/Message'
import { AddMessageFormRedux } from './AddMessageForm'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { actions } from '../../redux/dialogsReducer'

export type DialogsFormValuesType = {
    newMessageBody: string
}

export const DialogsPage: React.FC = memo(() => {
    const dialogsPage = useSelector((state: AppStateType) => state.dialogsPage)
    
    const dialogsElements = dialogsPage.dialogs.map(d => <DialogItem id={d.id} key={d.id} name={d.name} />)
    const messagesElements = dialogsPage.messages.map(m => <Message id={m.id} key={m.id} message={m.message} />)

    const dispatch = useDispatch()

    const onAddMessage = (newMessageBody: string) => { dispatch(actions.addMessage(newMessageBody)) }

    const addNewMessage = (FormData: DialogsFormValuesType) => onAddMessage(FormData.newMessageBody)
    
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
})