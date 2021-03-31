import s from './Profile.module.scss'
import PostsContainer from './Posts/PostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import Preloader from '../common/Preloader/Preloader'

const Profile = ({ profile, status, updateStatus }) => {
    if (!profile) {
        return <Preloader />
    } else {
        return (
            <div className={s.profile}>
                <ProfileInfo profile={profile} status={status} updateStatus={updateStatus} />
                <PostsContainer />
            </div>
        )
    }
}

export default Profile