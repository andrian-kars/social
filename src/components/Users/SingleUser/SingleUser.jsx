import s from './SingleUser.module.css'
import userPhoto from './../../../images/user-photo.png'

const SingleUser = (props) => {
    return (
        <div className={s.whrapper}>
            <div className={s.container}>
                <img className={s.avatar} src={userPhoto} alt={'User photo: ' + props.id} />
                <div className={s.content}>
                    <div className={s.name_section}>
                        <p className={s.name}>{props.fullName}</p>
                        <p>{props.location.country}</p>
                    </div>
                    <p className={s.status}>{props.status}</p>
                </div>
            </div>
            <button className={s.btn}>{props.followed ? 'Follow' : 'Unfollow'}</button>
        </div>
    )
}

export default SingleUser