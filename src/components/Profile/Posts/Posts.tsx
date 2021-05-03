import React, { memo } from 'react'
import s from './Posts.module.scss'
import { AddPostFormValuesType, AddPostFormRedux } from './AddPostForm'
import { Post } from './Post/Post'
import { PhotosType, PostType } from '../../../types/types'
import { useDispatch } from 'react-redux'

type PropsType = {
    posts: Array<PostType>
    photos: PhotosType
    isOwner: boolean
    savePosts: (posts: Array<PostType>) => void
}

export const Posts: React.FC<PropsType> = memo(({ posts, photos, isOwner, savePosts }) => {
    const localSavedItems = localStorage.getItem('savedPosts')

    const deletePost = (e: React.MouseEvent<HTMLButtonElement>) => {
        localStorage.setItem('savedPosts', JSON.stringify([...posts].filter(p => '' + p.id !== e.currentTarget.id)))
        setSavedPosts(JSON.parse('' + localSavedItems))
    }

    const postsElements = [...posts].reverse().map(p =>
        <Post deletePost={deletePost} avatar={photos.small} key={p.id} id={p.id} likesCount={p.likesCount} message={p.message} />)

    const dispatch = useDispatch()

    const setSavedPosts = (posts: Array<PostType>) => { dispatch(savePosts(posts)) }

    const savePost = (FormData: AddPostFormValuesType) => {
        const postToSave = {
            id: [...posts].length + 1,
            likesCount: 0,
            message: FormData.newPostBody,
        }

        if (posts.length === 0) {
            localStorage.setItem('savedPosts', `[${JSON.stringify(postToSave)}]`)
            setSavedPosts(JSON.parse('' + localSavedItems))
        } else {
            localStorage.setItem('savedPosts', JSON.stringify([...posts, postToSave]))
            setSavedPosts(JSON.parse('' + localSavedItems))
        }
        FormData.newPostBody = ''
    }

    return (
        <section className={s.posts}>
            {isOwner && <div className={s.whrapper}>
                <p className={s.heading}>Create Post</p>
                <AddPostFormRedux onSubmit={savePost} avatar={photos.small} />
            </div>}
            {postsElements.length === 0 ? <p className={s.noPosts}>You have no posts. Create one</p> : postsElements}
        </section>
    )
})