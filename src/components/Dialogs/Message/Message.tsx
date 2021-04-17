import s from './Message.module.scss'

type PropsType = {
    message: string
    id: number
    key: number
}

const Message: React.FC<PropsType> = (props) => {
    return (
        <div>
            <textarea disabled className={s.message} value={props.message} id={'' + props.id} key={'' + props.key} />
        </div>
    )
}


export default Message