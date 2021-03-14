import React from 'react'
import s from './Posts.module.css'
import Post from './Post/Post'

const Posts = (props) => {
    const postsElements = props.posts.map(p => <Post key={p.id} likesCount={p.likesCount} message={p.message} />)
    const newPostElement = React.createRef()
    
    const addNewPost = () => {
        props.addPost()
    }

    const onPostChange = () => {
        let text = newPostElement.current.value
        props.updateNewPostText(text)
    }

    return (
        <section className={s.posts}>
            <p className={s.heading}>My posts</p>
            <form className={s.form}>
                <textarea className={s.textarea} onChange={onPostChange} ref={newPostElement} value={props.newPostText} name="text" placeholder="Your news..." />
                <input className={s.input} type="button" value="Send" onClick={addNewPost} />
            </form>
            {postsElements}
        </section>
    )
}

export default Posts