import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import { actions, getProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profileReducer'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { AppStateType } from '../../redux/redux-store'
import { RouteComponentProps } from 'react-router-dom'
import { ProfileType } from '../../types/types'

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    setUserProfile: () => void
    getProfile: (userId: number | null) => void
    getStatus: (userId: number | null) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (prodile: ProfileType) => Promise<any>
}

type PathParamsType = {
    userId: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType> & {}

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorazedUserId
        }
        this.props.getProfile(userId)
        this.props.getStatus(userId)
    }
    
    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType) {
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

const mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorazedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, { setUserProfile: actions.setUserProfile, getProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter,
)(ProfileContainer)