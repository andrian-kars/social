import s from './Dialogs.module.scss'
import { DialogItem } from './DialogItem/DialogItem'
import { Message } from './Message/Message'
import { AddMessageFormRedux } from './AddMessageForm'
import { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { checkForNewMessages, saveDialogs, saveMessages, sendMessage } from '../../redux/dialogsReducer'
import { useParams } from 'react-router-dom'
import { Preloader } from './../common/Preloader/Preloader'
import { truncateString } from '../../utils/truncateString'
import { Toggle } from '../common/Toggle/Toggle'

export type DialogsFormValuesType = {
    newMessageBody: string
}

export const DialogsPage: React.FC = memo(() => {
    const dialogsPage = useSelector((state: AppStateType) => state.dialogsPage)
    const authorazedUserId = useSelector((state: AppStateType) => state.auth.userId)
    // Helpers
    const isFetching = dialogsPage.isFetching
    const isSubFetching = dialogsPage.isSubFetching

    const params: { userId: string | undefined } = useParams()
    const userId: number = params.userId === undefined ? 0 : +params.userId
    
    // const dialogsElements = <div className={s.noMessage}>No messages found</div>
    const dialogsElements = dialogsPage.dialogs.length === 0 ? 'No users'
        : dialogsPage.dialogs.map(d => <DialogItem id={d.id} key={d.id} userName={truncateString(d.userName, 12)} />)
    const messagesElements = dialogsPage.messages.length === 0 ? <div className={s.noUser}>No messages</div>
        : dialogsPage.messages.map(m => <Message viewed={!!m.viewed} myId={authorazedUserId} senderId={m.senderId}
            id={m.id} key={m.id} message={m.body} senderName={truncateString('' + m.senderName, 10)} />)

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

    // Live Reload
    const [liveReload, setLiveReload] = useState(false)
    useEffect(() => {
        const onCheckForNewMessages = (userId: number) => { dispatch(checkForNewMessages(userId)) }
        if(liveReload) {
            const interval = setInterval(() => {
                onCheckForNewMessages(userId)
            }, 1000)
            return () => clearInterval(interval)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [liveReload])
    
    return (
        <div className={s.whrapper}>
            {isFetching ? <Preloader />
                : <>
                    <div className={s.dialogs}>
                        {dialogsElements}
                    </div>
                    <div className={s.messages}>
                        {isSubFetching ? <Preloader />
                            : <>
                                {!userId ? <div className={s.noUser}>Select a thread or start a new conversation</div>
                                    : <>
                                        <div className={s.messagesWhrapper}>
                                            {messagesElements}
                                        </div>
                                        <div className={s.newMessageWhrapper}>
                                            <AddMessageFormRedux onSubmit={addNewMessage} />
                                        </div>
                                        <div className={s.liveReload} >
                                            <Toggle toggle={() => setLiveReload(!liveReload)}/>
                                        </div>
                                    </>}
                            </>}
                    </div>
                </>}
        </div>
    )
})