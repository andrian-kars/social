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
    const authorazedUserId = useSelector((state: AppStateType) => state.auth.userId)

    const params: { userId: string | undefined } = useParams()
    const userId: number = params.userId === undefined ? 0 : +params.userId
    
    const dialogsElements = dialogsPage.dialogs.length === 0 ? 'No users' : dialogsPage.dialogs.map(d => <DialogItem id={d.id} key={d.id} userName={d.userName} />)
    const messagesElements = dialogsPage.messages.length === 0 ? <div className={s.noUser}>No messages</div>
        : dialogsPage.messages.map(m => <Message myId={authorazedUserId} senderId={m.senderId} id={m.id} key={m.id} message={m.body} senderName={m.senderName} />)

    const dispatch = useDispatch()
    
    
    const onSendMessage = (userId: number, newMessageBody: string) => { dispatch(sendMessage(userId, newMessageBody)) }

    const addNewMessage = (FormData: DialogsFormValuesType) => {
        onSendMessage(userId, FormData.newMessageBody)
        FormData.newMessageBody = ''
    }

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
                {!userId ? <div className={s.noUser}>No user selected</div>
                    : <>
                        <div className={s.messagesWhrapper}>
                            {messagesElements}
                        </div>
                        <div className={s.newMessageWhrapper}>
                            <AddMessageFormRedux onSubmit={addNewMessage} />
                        </div>
                    </>}
            </div>

        </div>
    )
})