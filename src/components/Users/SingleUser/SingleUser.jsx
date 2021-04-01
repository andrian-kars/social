import s from './SingleUser.module.scss'
import userPhoto from './../../../images/user-photo.png'
import { NavLink } from 'react-router-dom'

const SingleUser = ({userID, photo, name, status, followed, followingInProgress, unfollow, follow}) => {
    return (
        <div className={s.whrapper}>
            <div className={s.photoWhrapper}>
                <NavLink to={'/profile/' + userID}><img className={s.avatar} src={photo === null ? userPhoto : photo} alt={'User photo: ' + userID} /></NavLink>
            </div>
            <div className={s.nameStatusWhrapper}>
                <NavLink to={'/profile/' + userID}><p className={s.name}>{name}</p></NavLink>
                <p className={s.status}>{status}</p>
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