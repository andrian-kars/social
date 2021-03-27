import React from 'react'
import s from './Posts.module.css'
import Post from './Post/Post'
import AddPostFormRedux from './AddPostForm'

const Posts = React.memo(props => {
    const postsElements = [...props.posts].reverse().map(p => <Post key={p.id} likesCount={p.likesCount} message={p.message} />)
    const addNewPost = (FormData) => props.addPost(FormData.newPostBody)
    return (
        <section className={s.posts}>
            <p className={s.heading}>My posts</p>
            <AddPostFormRedux onSubmit={addNewPost} />
            {postsElements}
        </section>
    )
})

export default Posts