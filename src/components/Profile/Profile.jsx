import s from './Profile.module.css'
import PostsContainer from './Posts/PostsContainer'
import User from './User/User'
import Banner from './Banner/Banner'
import Preloader from '../common/Preloader/Preloader'

const Profile = (props) => {
    if (!props.profile) {
        return <Preloader />
    } else {
        return (
            <div className={s.profile}>
                <Banner />
                <User profile={props.profile} />
                <PostsContainer />
            </div>
        )
    }
}

export default Profile