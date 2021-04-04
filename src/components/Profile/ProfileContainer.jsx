import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { setUserProfile, getProfile, getStatus, updateStatus, savePhoto } from './../../redux/profileReducer'
import { withRouter } from 'react-router'
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorazedUserId
        }
        this.props.getProfile(userId)
        this.props.getStatus(userId)
    }
    
    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render () {
        return (
            <Profile {...this.props}
                isOwner={!this.props.match.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto} />
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorazedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, { setUserProfile, getProfile, getStatus, updateStatus, savePhoto }),
    withRouter,
    WithAuthRedirect,
)(ProfileContainer)