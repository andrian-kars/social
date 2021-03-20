import s from './ProfileStatus.module.css'

const ProfileStatus = (props) => {
    return (
        <p className={s.text}> <span className={s.text_asked}>About:</span>{props.aboutMe}</p>
    )
}

export default ProfileStatus