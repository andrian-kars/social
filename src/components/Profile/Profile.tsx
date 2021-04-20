import s from './Profile.module.scss'
import { Posts } from './Posts/Posts'
import { ProfileInfo } from './ProfileInfo/ProfileInfo'
import { Preloader } from '../common/Preloader/Preloader'
import { ProfileType } from '../../types/types'

type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (prodile: ProfileType) => Promise<any>
}


const Profile: React.FC<PropsType> = (props) => {
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
                <Posts />
            </div>
        )
    }
}

export default Profile