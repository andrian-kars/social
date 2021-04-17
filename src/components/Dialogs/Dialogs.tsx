import s from './Dialogs.module.scss'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import AddMessageFormRedux from './AddMessageForm'
import { InitialStateType } from '../../redux/dialogsReducer'

type PropsType = {
    dialogsPage: InitialStateType
    onAddMessage: (newMessageBody: string) => void
}

export type DialogsFormValuesType = {
    newMessageBody: string
}

const Dialogs: React.FC<PropsType> = props => {
    const dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem id={d.id} key={d.id} name={d.name} />)
    const messagesElements = props.dialogsPage.messages.map(m => <Message id={m.id} key={m.id} message={m.message} />)
    const addNewMessage = (FormData: DialogsFormValuesType) => props.onAddMessage(FormData.newMessageBody)
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
}

export default Dialogs