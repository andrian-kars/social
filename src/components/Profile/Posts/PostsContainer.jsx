import StoreContext from '../../../context'
import { addPostActionCreator, updateNewPostTextActionCreator } from './../../../redux/profileReducer'
import Posts from './Posts'

const PostsContainer = () => {
    return (
        <StoreContext.Consumer>
            { (store) => {
                const state = store.getState()
                const onAddPost = () => {
                    store.dispatch(addPostActionCreator())
                }

                const onPostChange = (text) => {
                    store.dispatch(updateNewPostTextActionCreator(text))
                }

                return <Posts addPost={onAddPost} updateNewPostText={onPostChange}
                        newPostText={state.profilePage.newPostText}
                        posts={state.profilePage.posts} />
            }}
        </StoreContext.Consumer>
    )
}

export default PostsContainer