import s from './Profile.module.scss'
import PostsContainer from './Posts/PostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import Preloader from '../common/Preloader/Preloader'

const Profile = (props) => {
    if (!props.profile) {
        return <div className={s.load}><Preloader /></div>
    } else {
        return (
            <div className={s.profile}>
                <ProfileInfo saveProfile={props.saveProfile}
                    savePhoto={props.savePhoto}
                    isOwner={props.isOwner}
                    profile={props.profile}
                    status={props.status}
                    updateStatus={props.updateStatus} />
                <PostsContainer />
            </div>
        )
    }
}

export default Profile