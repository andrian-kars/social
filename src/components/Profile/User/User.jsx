import React from 'react'
import s from './User.module.css'
import userPhoto from './../../../images/user-photo.jpg'

const User = () => {
    return (
        <section className={s.user}>
            <div className={s.photo_whrapper}>
                <img className={s.photo} src={userPhoto} alt="user" />
            </div>
            <div className={s.info}>
                <h2 className={s.name}>Andrian K.</h2>
                <p className={s.text}><span className={s.text_asked}>Date of Birth:</span>15 February</p>
                <p className={s.text}><span className={s.text_asked}>City:</span>Lviv</p>
                <p className={s.text}><span className={s.text_asked}>Education:</span>TBA</p>
                <p className={s.text}><span className={s.text_asked}>Website:</span>http://andrian-kars.ru</p>
            </div>
        </section>
    )
}

export default User