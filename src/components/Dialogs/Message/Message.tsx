import { memo } from 'react'
import s from './Message.module.scss'

type PropsType = {
    message: string
    id: string | undefined
    senderName: string | undefined
    senderId: number | undefined
    myId: number
}

export const Message: React.FC<PropsType> = memo(({ senderName, myId, senderId, id, message}) => {
    return (
        <div className={s.message}>
            <span className={s.name}>{senderId === myId ? 'you' : senderName}: </span><span className={s.body} id={'' + id}>{message}</span>
        </div>
    )
})