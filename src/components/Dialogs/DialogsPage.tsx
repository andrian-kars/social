import s from './Dialogs.module.scss'
import { DialogItem } from './DialogItem/DialogItem'
import { Message } from './Message/Message'
import { AddMessageFormRedux } from './AddMessageForm'
import { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { saveDialogs, saveMessages, sendMessage } from '../../redux/dialogsReducer'
import { useParams } from 'react-router-dom'

export type DialogsFormValuesType = {
    newMessageBody: string
}

export const DialogsPage: React.FC = memo(() => {
    const dialogsPage = useSelector((state: AppStateType) => state.dialogsPage)

    const params: { userId: string | undefined } = useParams()
    const userId: number = params.userId === undefined ? 0 : +params.userId
    
    const dialogsElements = dialogsPage.dialogs.length === 0 ? 'No users' : dialogsPage.dialogs.map(d => <DialogItem id={d.id} key={d.id} userName={d.userName} />)
    const messagesElements = dialogsPage.messages.map(m => <Message id={m.id} key={m.id} message={m.body} />)

    const dispatch = useDispatch()
    
    
    const onSendMessage = (userId: number, newMessageBody: string) => { dispatch(sendMessage(userId, newMessageBody)) }

    const addNewMessage = (FormData: DialogsFormValuesType) => onSendMessage(userId, FormData.newMessageBody)

    useEffect(() => {
        const onSaveDialogs = () => { dispatch(saveDialogs()) }
        onSaveDialogs()
    }, [dispatch])

    useEffect(() => {
        const onSaveMessages = (userId: number) => { dispatch(saveMessages(userId)) }
        onSaveMessages(userId)
    }, [dispatch, userId])

    console.log(dialogsPage.messages);
    
    
    return (
        <div className={s.whrapper}>
            <div className={s.dialogs}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div className={s.messagesWhrapper}>
                    {userId ? messagesElements : <span>No user</span>}
                </div>
                <div className={s.newMessageWhrapper}>
                    <AddMessageFormRedux onSubmit={addNewMessage} />
                </div>
            </div>
        </div>
    )
})