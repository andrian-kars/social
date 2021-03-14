import s from './Profile.module.css'
import PostsContainer from './Posts/PostsContainer'
import User from './User/User'
import Banner from './Banner/Banner'

const Profile = (props) => {
    return (
        <div className={s.profile}>
            <Banner />
            <User />
            <PostsContainer store={props.store} />
        </div>
    )
}

export default Profile