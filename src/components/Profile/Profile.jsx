import s from './Profile.module.css'
import PostsContainer from './Posts/PostsContainer'
import User from './User/User'
import Banner from './Banner/Banner'

const Profile = (props) => {
    return (
        <div className={s.profile}>
            <Banner />
            <User />
            <PostsContainer dispatch={props.dispatch} newPostText={props.profilePage.newPostText} posts={props.profilePage.posts} />
        </div>
    )
}

export default Profile