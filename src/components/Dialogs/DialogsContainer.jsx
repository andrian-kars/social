import Dialogs from './Dialogs'
import { addMessageActionCreator, updateNewMessageTextActionCreator } from './../../redux/dialogsReducer'
import { connect } from 'react-redux'
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect'

const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddMessage: () => {
            dispatch(addMessageActionCreator())
        },
        onMessageChange: (text) => {
            dispatch(updateNewMessageTextActionCreator(text))
        },
    }
}

const AuthRedirectComponent = WithAuthRedirect(Dialogs)

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)

export default DialogsContainer