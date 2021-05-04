import s from './Profile.module.scss'
import { Posts } from './Posts/Posts'
import { ProfileInfo } from './ProfileInfo/ProfileInfo'
import { Preloader } from '../common/Preloader/Preloader'
import { PostType, ProfileType } from '../../types/types'

type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    isFetching: boolean
    posts: Array<PostType>
    onSaveProfile: (profile: ProfileType) => Promise<any>
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    savePosts: (posts: Array<PostType>) => void
}

const Profile: React.FC<PropsType> = (props) => {
    if (!props.profile || props.isFetching) {
        return <div className={s.load}><Preloader /></div>
    } else {
        return (
            <div className={s.profile}>
                <ProfileInfo onSaveProfile={props.onSaveProfile}
                    savePhoto={props.savePhoto}
                    isOwner={props.isOwner}
                    profile={props.profile}
                    status={props.status}
                    updateStatus={props.updateStatus} />
                {/* As long as API does not support it */}
                {props.isOwner && <Posts posts={props.posts}
                    photos={props.profile.photos}
                    isOwner={props.isOwner}
                    savePosts={props.savePosts} />}
            </div>
        )
    }
}

export default Profile