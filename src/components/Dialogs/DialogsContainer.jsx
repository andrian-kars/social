import Dialogs from './Dialogs'
import { addMessageActionCreator, updateNewMessageTextActionCreator } from './../../redux/dialogsReducer'
import StoreContext from '../../context'

const DialogsContainer = () => {

    return (
        <StoreContext.Consumer>
            { (store) => {
                const state = store.getState()
                let onAddMessage = () => {
                    store.dispatch(addMessageActionCreator())
                }

                let onMessageChange = (text) => {
                    store.dispatch(updateNewMessageTextActionCreator(text))
                }
                return <Dialogs onAddMessage={onAddMessage} onMessageChange={onMessageChange} dialogsPage={state.dialogsPage} />
            }}
        </StoreContext.Consumer>
    )
}

export default DialogsContainer