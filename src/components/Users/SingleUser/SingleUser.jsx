import s from './SingleUser.module.css'
import userPhoto from './../../../images/user-photo.png'
import * as axios from 'axios'
import { NavLink } from 'react-router-dom'
import { apiKey } from '../../../apiKey'

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
                ? <button onClick={() => { 
                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${props.id}`, { 
                        withCredentials: true,
                        headers: {
                            'API-KEY': apiKey
                        }
                    })
                        .then(response => {
                            if (response.data.resultCode === 0) {
                                props.unfollow(props.id)
                            }
                        })
                
                }} className={s.unfollow}>Unfollow</button>
                : <button onClick={() => { 
                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${props.id}`, {}, { 
                        withCredentials: true,
                        headers: {
                            'API-KEY': apiKey
                        }
                    })
                        .then(response => {
                            if (response.data.resultCode === 0) {
                                props.follow(props.id)
                            }
                        })
                }} className={s.follow}>Follow</button>}
        </div>
    )
}

export default SingleUser

