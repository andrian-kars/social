import React from 'react'
// import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer'
import Posts from './Posts'

const PostsContainer = (props) => {
    // let state = props.store.getState()
    // let onAddPost = () => {
    //     props.store.dispatch(addPostActionCreator())
    // }

    // let onPostChange = (text) => {
    //     props.store.dispatch(updateNewPostTextActionCreator(text))
    // }

    // return (<Posts updateNewPostText={onPostChange} addPost={onAddPost} posts={state.profilePage.posts} newPostText={state.profilePage.newPostText} />)
    return (<Posts addPost={props.addPost} newPostText={props.newPostText} updateNewPostText={props.updateNewPostText} posts={props.posts} />)
}

export default PostsContainer