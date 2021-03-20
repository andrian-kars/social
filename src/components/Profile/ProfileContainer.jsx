import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { setUserProfile, getProfile } from './../../redux/profileReducer'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router'

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = 2;
        }
        this.props.getProfile(userId)
    }

    render () {
        if (!this.props.isAuth) {
            return <Redirect to={'/login'} />
        }
        return (
            <Profile {...this.props} profile={this.props.profile} />
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

const withUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, { setUserProfile, getProfile })(withUrlDataContainerComponent)