import { addPostActionCreator, updateNewPostTextActionCreator } from './../../../redux/profileReducer'
import Posts from './Posts'

const PostsContainer = (props) => {
    const state = props.store.getState()
    const onAddPost = () => {
        props.store.dispatch(addPostActionCreator())
    }

    const onPostChange = (text) => {
        props.store.dispatch(updateNewPostTextActionCreator(text))
    }

    return (<Posts addPost={onAddPost} updateNewPostText={onPostChange} newPostText={state.profilePage.newPostText} posts={state.profilePage.posts} />)
}

export default PostsContainer