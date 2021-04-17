import React from 'react'
import s from './Posts.module.scss'
import Post from './Post/Post'
import AddPostFormRedux, { AddPostFormValuesType } from './AddPostForm'
import { PhotosType, PostType } from '../../../types/types'

type PropsType = {
    posts: Array<PostType>
    photos: PhotosType
    isOwner: boolean
    addPost: (newPostBody: string) => void
}

const Posts: React.FC<PropsType> = React.memo(props => {
    const postsElements = [...props.posts].reverse().map(p => <Post avatar={props.photos.small} key={p.id} likesCount={p.likesCount} message={p.message} />)
    const addNewPost = (FormData: AddPostFormValuesType) => props.addPost(FormData.newPostBody)
    return (
        <section className={s.posts}>
            {props.isOwner && <div className={s.whrapper}>
                <p className={s.heading}>Create Post</p>
                <AddPostFormRedux onSubmit={addNewPost} avatar={props.photos.small} />
            </div>}
            {postsElements}
        </section>
    )
})

export default Posts