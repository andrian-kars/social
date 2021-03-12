import Dialogs from './Dialogs'
// import { addMessageActionCreator, updateNewMessageTextActionCreator } from './../../redux/dialogs-reducer'

const DialogsContainer = (props) => {
    // let onAddMessage = () => {
    //     props.store.dispatch(addMessageActionCreator())
    // }

    // let onMessageChange = (text) => {
    //     props.store.dispatch(updateNewMessageTextActionCreator(text))
    // }

    return (
        <Dialogs />
        // <Dialogs dialogsPage={props.store.getState().dialogsPage} addNewMessage={onAddMessage} onMessageChange={onMessageChange} />
    )
}

export default DialogsContainer