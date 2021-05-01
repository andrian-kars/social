import { memo } from 'react'
import s from './Message.module.scss'

type PropsType = {
    message: string
    id: string | undefined
}

export const Message: React.FC<PropsType> = memo((props) => {
    return (
        <div>
            <textarea disabled className={s.message} value={props.message} id={'' + props.id} />
        </div>
    )
})