import Dialogs from './Dialogs'
import { addMessageActionCreator, updateNewMessageTextActionCreator } from './../../redux/dialogsReducer'

const DialogsContainer = (props) => {
    const state = props.store.getState()
    let onAddMessage = () => {
        props.store.dispatch(addMessageActionCreator())
    }

    let onMessageChange = (text) => {
        props.store.dispatch(updateNewMessageTextActionCreator(text))
    }

    return (
        <Dialogs onAddMessage={onAddMessage} onMessageChange={onMessageChange}  dialogsPage={state.dialogsPage} />
    )
}

export default DialogsContainer