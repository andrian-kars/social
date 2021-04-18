import Dialogs from './Dialogs'
import { actions } from '../../redux/dialogsReducer'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { AppStateType } from '../../redux/redux-store'

const mapStateToProps = (state: AppStateType) => ({
    dialogsPage: state.dialogsPage
})

export default compose(
    connect(mapStateToProps, {
        onAddMessage: actions.addMessage
    }),
)(Dialogs)