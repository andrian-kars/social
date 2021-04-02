import s from './Message.module.scss'

const Message = (props) => {
    return (
        <div>
            <textarea disabled className={s.message} value={props.message} />
        </div>
    )
}


export default Message