import Dialogs from './Dialogs'
import { addMessageActionCreator } from './../../redux/dialogsReducer'
import { connect } from 'react-redux'
import { compose } from 'redux'

const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddMessage: (newMessageBody) => {
            dispatch(addMessageActionCreator(newMessageBody))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Dialogs)