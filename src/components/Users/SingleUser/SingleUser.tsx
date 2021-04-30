import s from './SingleUser.module.scss'
import userPhoto from './../../../images/user-photo.png'
import { NavLink } from 'react-router-dom'
import { PhotosType } from '../../../types/types'
import { truncateString } from '../../../utils/truncateString'

type PropsType = {
    userID: number
    photo: PhotosType
    name: string
    status: string
    followed: boolean
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

const SingleUser: React.FC<PropsType> = ({userID, photo, name, status, followed, followingInProgress, unfollow, follow}) => {
    return (
        <div className={s.whrapper}>
            <div className={s.photoWhrapper}>
                <NavLink to={'/profile/' + userID}><img className={s.avatar} src={photo.small === null ? userPhoto : photo.small} alt={'User photo: ' + userID} /></NavLink>
            </div>
            <div className={s.nameStatusWhrapper}>
                <NavLink to={'/profile/' + userID}><p className={s.name} title={name}>{truncateString(name, 19)}</p></NavLink>
                <p className={s.status} title={status}>{truncateString(status, 19)}</p>
                {followed
                    ? <button disabled={followingInProgress
                        .some(id => id === userID)}
                        onClick={() => { unfollow(userID) }}
                        className={`${s.button} ${s.unfollow}`}>Unfollow</button>
                    : <button disabled={followingInProgress
                        .some(id => id === userID)}
                        onClick={() => { follow(userID) }}
                        className={`${s.button} ${s.follow}`}>Follow</button>}
            </div>
        </div>
    )
}

export default SingleUser