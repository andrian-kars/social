import React from 'react'
import s from './Post.module.css'
import userPhoto from './../../../../images/user-photo.jpg'

const Post = (props) => {
    return (
        <div className={s.item}>
            <img className={s.avatar} src={userPhoto} alt="user" />
            <p className={s.text}>{props.message}</p>
            <span className={s.like_count}>{props.likesCount} likes</span>
        </div>
    )
}

export default Post