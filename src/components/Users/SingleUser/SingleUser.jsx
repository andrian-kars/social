import s from './SingleUser.module.css'
import userPhoto from './../../../images/user-photo.png'
import { NavLink } from 'react-router-dom'
import { usersAPI } from '../../../api/api'

const SingleUser = (props) => {
    return (
        <div className={s.whrapper}>
            <div className={s.container}>
                <NavLink to={'/profile/' + props.id}><img className={s.avatar} src={props.photo === null ? userPhoto : props.photo} alt={'User photo: ' + props.id} /></NavLink>
                <div className={s.content}>
                    <div className={s.name_section}>
                        <NavLink to={'/profile/' + props.id}><p className={s.name}>{props.name}</p></NavLink>
                        <p className={s.location}>Ukraine</p>
                    </div>
                    <p className={s.status}>{props.status}</p>
                </div>
            </div>
            {props.followed
                ? <button disabled={props.followingInProgress.some(id => id === props.id)} onClick={() => {
                    props.toggleFollowingProgress(true, props.id)
                    usersAPI.deleteFollow(props.id).then(data => {
                            if (data.resultCode === 0) {
                                props.unfollow(props.id)
                            }
                            props.toggleFollowingProgress(false, props.id)
                        })
                
                }} className={`${s.button} ${s.unfollow}`}>Unfollow</button>
                : <button disabled={props.followingInProgress.some(id => id === props.id)} onClick={() => {
                    props.toggleFollowingProgress(true, props.id)
                    usersAPI.postFollow(props.id).then(data => {
                            if (data.resultCode === 0) {
                                props.follow(props.id)
                            }
                            props.toggleFollowingProgress(false, props.id)
                        })
                }} className={`${s.button} ${s.follow}`}>Follow</button>}
        </div>
    )
}

export default SingleUser