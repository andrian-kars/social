import React from 'react'
import s from './User.module.css'
import userPhoto from './../../../images/user-photo.png'

const User = (props) => {
    return (
        <section className={s.user}>
            <div className={s.photo_whrapper}>
                <img className={s.photo} src={props.profile.photos.large === null ? userPhoto : props.profile.photos.large} alt={'User photo: ' + props.id} />
            </div>
            <div className={s.info}>
                <h2 className={s.name}>{props.profile.fullName}</h2>
                {props.profile.aboutMe === null ? '' : <p className={s.text}>
                    <span className={s.text_asked}>About:</span>{props.profile.aboutMe}</p>}

                {props.profile.lookingForAJob === null ? '' : <p className={s.text}>
                    <span className={s.text_asked}>Open to work:</span>{props.profile.lookingForAJob ? 'Yes' : 'No'}</p>}

                {props.profile.lookingForAJobDescription === null ? '' : <p className={s.text}>
                    <span className={s.text_asked}>Description:</span>{props.profile.lookingForAJobDescription}</p>}

                {props.profile.contacts.facebook === null ? '' : <p className={s.text}>
                    <span className={s.text_asked}>Facebook:</span>{props.profile.contacts.facebook}</p>}

                {props.profile.contacts.website === null ? '' : <p className={s.text}>
                    <span className={s.text_asked}>Website:</span>{props.profile.contacts.website}</p>}

                {props.profile.contacts.vk === null ? '' : <p className={s.text}>
                    <span className={s.text_asked}>VK:</span>{props.profile.contacts.vk}</p>}

                {props.profile.contacts.twitter === null ? '' : <p className={s.text}>
                    <span className={s.text_asked}>Twitter:</span>{props.profile.contacts.twitter}</p>}

                {props.profile.contacts.youtube === null ? '' : <p className={s.text}>
                    <span className={s.text_asked}>Youtube:</span>{props.profile.contacts.youtube}</p>}

                {props.profile.contacts.github === null ? '' : <p className={s.text}>
                    <span className={s.text_asked}>Github:</span>{props.profile.contacts.github}</p>}

                {props.profile.contacts.mainLink === null ? '' : <p className={s.text}>
                    <span className={s.text_asked}>MainLink:</span>{props.profile.contacts.mainLink}</p>}
            </div>
        </section>
    )
}

export default User