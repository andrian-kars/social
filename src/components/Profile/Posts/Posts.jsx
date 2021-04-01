import React from 'react'
import s from './Posts.module.scss'
import Post from './Post/Post'
import AddPostFormRedux from './AddPostForm'

const Posts = React.memo(props => {
    const postsElements = [...props.posts].reverse().map(p => <Post avatar={props.avatar} key={p.id} likesCount={p.likesCount} message={p.message} />)
    const addNewPost = (FormData) => props.addPost(FormData.newPostBody)
    return (
        <section className={s.posts}>
            <div className={s.whrapper}>
                <p className={s.heading}>Create Post</p>
                <AddPostFormRedux onSubmit={addNewPost} avatar={props.avatar} />
            </div>
            {postsElements}
        </section>
    )
})

export default Posts