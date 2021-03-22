import React from 'react'
import ProfileInfo from './Profile'
import { connect } from 'react-redux'
import { setUserProfile, getProfile, getStatus, updateStatus } from './../../redux/profileReducer'
import { withRouter } from 'react-router'
// import { WithAuthRedirect } from '../../hoc/WithAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = 15772;
        }
        this.props.getProfile(userId)
        this.props.getStatus(userId)
    }

    render () {
        return (
            <ProfileInfo {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
})

export default compose(
    connect(mapStateToProps, { setUserProfile, getProfile, getStatus, updateStatus }),
    withRouter,
    // WithAuthRedirect,
)(ProfileContainer)