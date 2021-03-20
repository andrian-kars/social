import s from './Profile.module.css'
import PostsContainer from './Posts/PostsContainer'
import User from './User/ProfileInfo'
import Preloader from '../common/Preloader/Preloader'

const Profile = (props) => {
    if (!props.profile) {
        return <Preloader />
    } else {
        return (
            <div className={s.profile}>
                <User profile={props.profile} />
                <PostsContainer />
            </div>
        )
    }
}

export default Profile