import React from 'react'
import s from './Post.module.css'
import userPhoto from './../../../../images/user-photo.png'

const Post = (props) => {
    return (
        <div className={s.item}>
            <img className={s.avatar} src={props.avatar === null ? userPhoto : props.avatar} alt="user" />
            <p className={s.text}>{props.message}</p>
            <span className={s.like_count}>{props.likesCount} likes</span>
        </div>
    )
}

export default Post