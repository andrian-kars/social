import React from 'react'
import { addPostActionCreator } from './../../../redux/profileReducer'
import Posts from './Posts'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        avatar: state.profilePage.profile.photos.small,
        userId: state.profilePage.profile.userId,
        authorazedUserId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostBody) => {
            dispatch(addPostActionCreator(newPostBody))
        }
    }
}
class PostsContainer extends React.Component {
    render() {
        return (
            <Posts {...this.props}
                isOwner={this.props.userId === this.props.authorazedUserId}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer)