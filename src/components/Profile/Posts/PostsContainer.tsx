import React from 'react'
import { actions } from '../../../redux/profileReducer'
import Posts from './Posts'
import { connect } from 'react-redux'
import { AppStateType } from '../../../redux/redux-store'
import { PhotosType, PostType } from '../../../types/types'
import { compose } from 'redux'

type MapStatePropsType = {
    posts: Array<PostType>
    authorazedUserId: number | null
    userId: number
    photos: PhotosType
}

type MapDispatchPropsType = {
    addPost: (newPostBody: string) => void
}

type OwnPropsType = {

}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class PostsContainer extends React.Component<PropsType> {
    render() {
        return (
            <Posts {...this.props}
                isOwner={this.props.userId === this.props.authorazedUserId}
            />
        )
    }
}

const mapStateToProps = (state: any): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        userId: state.profilePage.profile.userId,
        photos: state.profilePage.profile.photos,
        authorazedUserId: state.auth.userId
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { addPost: actions.addPost })
)(PostsContainer)